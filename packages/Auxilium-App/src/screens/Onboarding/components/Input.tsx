import React from 'react';
import { TextInput } from 'react-native';

interface InputProps {
	formikProps: any;
	name: string
}

const Input = ({ formikProps, name, ...otherProps }: InputProps) => {
	const hasError = formikProps.touched[name] && formikProps.errors[name];
	return (
		<TextInput
			onChange={formikProps.handleChange(name)}
			onBlur={formikProps.handleBlur(name)}
			style={{
				width: ,
				borderWidth: '1px',
				borderColor: hasError ? 'red' : 'transparent',
				backgroundColor: '#D3D3D3',
				color: '#505050'
			}}
			{...otherProps}
		/>
	);
};

export default Input;
