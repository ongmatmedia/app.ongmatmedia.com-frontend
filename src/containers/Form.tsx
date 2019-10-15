import React from 'react'
import { observable, keys } from "mobx";
import { observer, IReactComponent } from 'mobx-react';

export type FormRenderProps<T> = {
    value: T,
    setValue: (value: T) => void,
    error: string | undefined
    touched: boolean
    loading: boolean
    set_touched: Function,
    setValues: (data: { [key: string]: any }, exclude_check_keys?: string[]) => void
}

type FormFieldParams<T> = {
    name: string
    initalValue?: T
    render: (config: FormRenderProps<T>) => JSX.Element
    require?: string
    validator?: (value: T) => string | void
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


    field<T>({ name, render, require, validator, initalValue }: FormFieldParams<T>) {
        if (initalValue != undefined) {
            this.data[name] == undefined && (this.data[name] = initalValue)
            this.defaultValues.set(name, initalValue)
        }
        require && this.require_fields.set(name, require)
        validator && this.validators.set(name, validator)

        const setValue = (key: string, value: T, validate: boolean = true) => {
            this.data[key] = value

            if (!validate) return

            if (require && this.data[key] == undefined) {
                this.errors.set(key, require)
                return;
            }


            if (validator) {
                const check = validator(value)
                if (check) {
                    this.errors.set(key, check)
                    return
                }
            }

            this.errors.delete(key)

        }


        return render({
            error: this.errors.get(name),
            loading: this.isLoading.get(name) == true,
            setValues: (data, exclude_check_keys: string[] = []) => {
                for (let key in data) setValue(key, data[key], !exclude_check_keys.includes(key))
            },
            setValue: (value: T) => setValue(name, value),
            set_touched: () => {
                if (this.data[name] == undefined && this.require_fields.has(name)) {
                    this.errors.set(name, this.require_fields.get(name) as string)
                }
                this.isTouched.set(name, true)
            },
            touched: this.isTouched.get(name) == true,
            value: this.data[name]
        })
    }

    submit(ok: Function) {
        for (const name of Array.from(this.require_fields.keys())) {
            this.data[name] == undefined && this.errors.set(name, this.require_fields.get(name) as string)
        }

        for (const name of Array.from(this.validators.keys())) {
            if (this.data[name] == undefined) continue;
            const check = (this.validators.get(name) as Function)(this.data[name])
            if (check) {
                this.errors.set(name, check)
            }
        }
        if (this.errors.size > 0) return

        ok(this.data)
    }

}

export const withForm = <T extends {}>(target: IReactComponent<{ form: Form } & T>) => {
    const C = observer(target)
    return props => <C form={new Form()} {...props} />
}