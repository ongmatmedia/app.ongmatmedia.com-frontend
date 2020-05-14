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

	const changeValue = (v: string) => {
		if (v.match(/\./g)?.length > 1) return
		if (v.endsWith('.')) {
			set_value(v)
		} else {
			const n = Number(v.replace(/[^\d\-\.]/g, ''))
			set_value(Number(n).toLocaleString('en-US'))
			n != NaN && props.onChangeValue(n)
		}
	}

	return (
		<AutoSelectInput
			value={value}
			onChange={e => changeValue(e.target.value)}
		/>
	)
}
