import { observable } from 'mobx'
import { observer, IReactComponent } from 'mobx-react'
import React from 'react'

export type FormRenderProps<T> = {
	value: T
	setValue: (value: T) => void
	error: string | undefined
	touched: boolean
	loading: boolean
	set_touched: Function
	setValues: (
		data: { [key: string]: any },
		exclude_check_keys?: string[],
	) => void
}

export type FormFieldParams<T> = {
	visible?: boolean
	ignore?: boolean
	name: string
	initalValue?: T
	render: (config: FormRenderProps<T>) => JSX.Element
	require?: string
	validator?: (value: T) => string | boolean | void
}

export class Form {
	@observable data: { [key: string]: any } = {}
	@observable errors: Map<string, string> = new Map()
	@observable isTouched: Map<string, boolean> = new Map()
	@observable isLoading: Map<string, boolean> = new Map()

	private require_fields: Map<string, string> = new Map()
	private validators: Map<string, Function> = new Map()
	private defaultValues: Map<string, any> = new Map()

	loading(name: string) {
		this.isLoading.set(name, true)
	}

	stopLoading(name: string) {
		this.isLoading.delete(name)
	}

	reset() {
		for (const name of Array.from(this.defaultValues.keys())) {
			this.data[name] = this.defaultValues.get(name)
		}
	}

	setValues(data: { [key: string]: any }) {
		for (const key in data) this.data[name] = data[key]
	}

	field<T>({
		name,
		render,
		require,
		validator,
		initalValue,
		ignore,
		visible,
	}: FormFieldParams<T>) {
		if (ignore) {
			delete this.data[name]
			this.defaultValues.delete(name)
			this.require_fields.delete(name)
			this.validators.delete(name)
			this.errors.delete(name)
			return null
		}

		if (initalValue != undefined) {
			this.data[name] == undefined && (this.data[name] = initalValue)
			this.defaultValues.set(name, initalValue)
		}

		require && this.require_fields.set(name, require)
		validator && this.validators.set(name, validator)

		const setValue = (key: string, value: T, validate = true) => {
			this.data[key] = value
			if (!validate) return

			if (require && (this.data[key] === undefined || this.data[key] === '')) {
				this.errors.set(key, require)
				return
			}

			if (validator) {
				const check = validator(value)
				if (check && typeof check == 'string') {
					this.errors.set(key, check)
					return
				}
			}

			this.errors.delete(key)
		}

		if (visible == false) return null

		return render({
			error: this.errors.get(name),
			loading: this.isLoading.get(name) == true,
			setValues: (data, exclude_check_keys: string[] = []) => {
				for (const key in data)
					setValue(key, data[key], !exclude_check_keys.includes(key))
			},
			setValue: (value: T) => setValue(name, value),
			set_touched: () => {
				if (this.data[name] == undefined && this.require_fields.has(name)) {
					this.errors.set(name, this.require_fields.get(name) as string)
				}
				this.isTouched.set(name, true)
			},
			touched: this.isTouched.get(name) == true,
			value: this.data[name],
		})
	}

	submit(ok: Function) {
		for (const name of Array.from(this.require_fields.keys())) {
			this.data[name] == undefined &&
				this.errors.set(name, this.require_fields.get(name) as string)
		}

		for (const name of Array.from(this.validators.keys())) {
			const check = (this.validators.get(name) as Function)(this.data[name])
			if (check) {
				this.errors.set(name, check)
			}
		}
		if (this.errors.size > 0) return

		ok(this.data)
	}
}

export const withForm = <T extends {}>(
	Target: IReactComponent<{ form: Form } & T>,
) => {
	const C = observer(Target)
	return (props: T) => <C form={new Form()} {...props} />
}
