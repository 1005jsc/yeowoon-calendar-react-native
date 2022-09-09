import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import styled from 'styled-components';

import CommonDatePicker from './common';
import { Props as InputProps } from '../Input';
import Typography from '../Typography';
import { errorToMessage } from '../../../helper/errorToMessage';

type Props = {
  name: string;
  defaultValue?: Date | string;
  minDateDisabled?: boolean;
  compareDate?: Date;
} & Pick<
  InputProps,
  'variantSize' | 'label' | 'disabled' | 'isRequired' | 'placeholder' | 'width'
>;

const Component: FC<Props> = ({
  name,
  disabled = false,
  label,
  minDateDisabled = false,
  defaultValue,
  isRequired,
  width,
  compareDate,
  variantSize,
  placeholder,
}) => {
  const { control, formState } = useFormContext();

  const error = formState.errors[`${name}`];

  const renderLabel = (labelValue: string | undefined | JSX.Element) => {
    if (!labelValue) {
      return;
    } else {
      if (typeof labelValue === 'string') {
        return (
          <LabelBox>
            <Label>{labelValue}</Label>
            {isRequired && <Required>*</Required>}
          </LabelBox>
        );
      } else {
        return (
          <LabelBox>
            {labelValue} {isRequired && <Required>*</Required>}
          </LabelBox>
        );
      }
    }
  };

  const renderErrorMsg = () => {
    return <div>{error && <ErrMsg>{errorToMessage(error.type)}</ErrMsg>}</div>;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <>
            <CommonDatePicker
              renderLabel={renderLabel}
              renderErrorMsg={renderErrorMsg}
              minDateDisabled={minDateDisabled}
              compareDate={compareDate}
              onChange={onChange}
              value={value}
              label={label}
              disabled={disabled}
              width={width}
              defaultValue={defaultValue}
              placeholder={placeholder}
              variantSize={variantSize}
            />
          </>
        );
      }}
    ></Controller>
  );
};

export default Component;

const LabelBox = styled.div`
  display: flex;
  margin-bottom: 4px;
`;

const Label = styled(Typography).attrs({ variant: 'body1-medium' })`
  color: ${({ theme }) => theme.colors.neutral[900]};
`;

const Required = styled.div`
  padding-top: 2px;
  padding-left: 2px;
  color: ${({ theme }) => theme.colors.red[500]};
`;

const Wrapper = styled.div`
  position: relative;
`;

const ErrMsg = styled(Typography)`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.red};
`;
