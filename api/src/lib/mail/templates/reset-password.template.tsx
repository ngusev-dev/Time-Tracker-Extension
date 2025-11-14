import * as React from 'react';
import {
  Body,
  Html,
  Container,
  Heading,
  Link,
  Section,
  Tailwind,
  Text,
  pixelBasedPreset,
} from '@react-email/components';

interface IResetPasswordTemplate {
  resetCode: number;
  firstName: string;
}
export function ResetPasswordTemplate({ resetCode, firstName }) {
  return (
    <Html>
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
        }}
      >
        <Body className="bg-white font-plaid">
          <Container className="bg-white border border-solid border-[#eee] rounded shadow-[rgba(20,50,70,.2)] shadow-md mt-5 max-w-[360px] mx-auto my-0 pt-[68px] px-0 pb-[130px]">
            <Text className="text-[#444] text-[15px] leading-[23px] tracking-[0] py-0 px-10 m-0 text-center">
              Привет, {firstName}! Твой код для восстановления доступа в личный
              кабинет:
            </Text>
            <Section className="bg-[rgba(0,0,0,.05)] rounded mx-auto font-[HelveticaNeue-Bold] mt-4 mb-3.5 align-middle w-[280px]">
              <Text className="text-black text-[32px] font-bold tracking-[6px] leading-10 py-2 mx-auto my-0 block text-center">
                {resetCode}
              </Text>
            </Section>
          </Container>
          <Text className="text-black text-xs font-extrabold tracking-[0] leading-[23px] m-0 mt-5 text-center uppercase">
            Securely powered by Timer-Tracker Dev.Team.
          </Text>
        </Body>
      </Tailwind>
    </Html>
  );
}
