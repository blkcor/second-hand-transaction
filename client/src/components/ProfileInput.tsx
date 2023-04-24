import { Flex, Input } from '@chakra-ui/react';
import React, { useState } from 'react';

type ProfileInputProps = {
  title: string
  placeHolder?: string
  type: "text" | "password" | "email" | "number" | "date" | "radio"
  id: string,
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disable?: boolean;
};

const ProfileInput: React.FC<ProfileInputProps> = ({ onChange, title, placeHolder, type, id, value = '', disable }) => {


  return (
    <Flex
      alignItems="center"
      gap="2"
      w-130
    >
      <label htmlFor={id} w-28 min-w-28 font-800>{title}</label>
      <Input id={id} placeholder={placeHolder} type={type} defaultValue={value} onChange={onChange} disabled={disable} />
    </Flex >
  )
}
export default ProfileInput;
