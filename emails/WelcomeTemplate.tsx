import React, { CSSProperties } from 'react';
import { Html, Body, Container, Text, Link, Preview, Tailwind } from '@react-email/components';

// body styled with Tailwind and heading with CSS properties
const WelcomeTemplate = ({ name }: {name: string }) => {
  return (
    <Html>
        <Preview>Welcome aboard!</Preview>
        <Tailwind>
            <Body className='bg-white'> 
                <Container>
                    <Text style={heading}>Hello {name}</Text>
                    <Link href="https://brucette.com">www.brucette.com</Link>
                </Container>
            </Body>
        </Tailwind>
    </Html>
  ) 
}

const body: CSSProperties = {
    background: '#fff'
}

const heading: CSSProperties = {
    fontSize: '32px'
}
export default WelcomeTemplate