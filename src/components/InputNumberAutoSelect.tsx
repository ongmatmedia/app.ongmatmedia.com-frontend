import React, { useEffect, useState } from 'react'
import { AutoSelectInput } from './AutoSelectInput'

type InputNumberAutoSelectProps = {
	onChangeValue: (newValue: number) => any
	defaultValue: number
}

export const InputNumberAutoSelect = (props: InputNumberAutoSelectProps) => {
	const [value, set_value] = useState<string>(
		props.defaultValue.toLocaleString('en-US'),
	)

	useEffect(() => set_value(props.defaultValue.toLocaleString('en-US')), [
		props.defaultValue,
	])

	const changeValue = (v: string) => {
		if (v.endsWith('.') || v == '-') return set_value(v)

		const n = Number(v.replace(/[^\d\-\.]/g, ''))
		if (n == NaN) return
		set_value(n.toLocaleString('en-US'))
		props.onChangeValue(n)
	}

	return (
		<AutoSelectInput
			value={value}
			onChange={e => changeValue(e.target.value)}
		/>
	)
}
