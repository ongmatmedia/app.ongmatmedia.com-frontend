import Input, { InputProps } from 'antd/lib/input'
import React, { createRef } from 'react'

export const AutoSelectInput = (props: InputProps) => {
	const ref = createRef<{ select: Function }>()
	const select_all_contents = () => {
		ref.current && ref.current.select()
	}
	const Element = (
		<Input
			ref={ref as any}
			{...props}
			onFocus={e => {
				props.onFocus && props.onFocus(e)
				select_all_contents()
			}}
		/>
	)
	return Element
}
