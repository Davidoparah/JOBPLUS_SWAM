import React from 'react';
import Container from '../components/container/container';
import Cookie from '../components/cookie/cookie';
import Footer from '../components/footer/footer';
import ResetPassword from '../components/reset_password/reset_password';
import HeroSimple from '../components/hero/hero_simple';

export default function ResetPasswordPage() {
  return (
    <>
      <section>
        <HeroSimple title="Login" />
        <Container>
          <ResetPassword />
        </Container>
        <Cookie />
      </section>
      <Footer />
    </>
  );
}
