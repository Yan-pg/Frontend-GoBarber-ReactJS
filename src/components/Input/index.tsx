import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>; // recebe um parametro com as propriedades do que o meu icon pode receber
}

const Input: React.FC<InputProps> = (
  { name, icon: Icon, ...rest }, // icon não pode passar dentro de uma tag com letra minuscula
) => {
  const inputRef = useRef<HTMLInputElement>(null); // Essa função da acesso direto ao input
  const [isfocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  /**
   *JS quando eu declaro uma fução dentro da outra ela vai recriar a proxima fução na memoria
   Sempre que for cirar uma função dentro de um componente não vamos criar do
   jeito de function() esim utilizar o useCallback que é uma forma de usar uma função no react
   */

  const hanleInputBluer = useCallback(() => {
    setIsFocused(false); // fução para saber quando o input perde o focus

    // if (inputRef.current?.value) {
    //   setIsFilled(true);
    // } else {
    //   setIsFilled(false);
    // }

    setIsFilled(!!inputRef.current?.value); // Tranfomando em booleano e fazendo a mesma coisa do if else
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isfocused={isfocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handInputFocus}
        onBlur={hanleInputBluer}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
