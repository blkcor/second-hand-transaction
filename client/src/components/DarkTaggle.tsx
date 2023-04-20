import React from 'react';
import {
  Image, Switch
} from '@chakra-ui/react';

type DarkTaggleProps = {

};

const DarkTaggle: React.FC<DarkTaggleProps> = () => {

  return (
    <div>
      <Image src='/sun.svg' h-8 w-8 />
      <Switch />
      <Image src='/moon.svg' h-8x w-8 />
    </div>
  )
}
export default DarkTaggle;
