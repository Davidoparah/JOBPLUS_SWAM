import React from 'react';
import Nav from '../components/nav/nav';
import Hero from '../components/hero/hero';
import Container from '../components/container/container';
import Cookie from '../components/cookie/cookie';
import Footer from '../components/footer/footer';
import ListingFilter from '../components/listings_filter/listings_fillter';
import Applications from '../components/application/applications';
import Filter from '../components/filter/filter';

export default function ApplicationPage() {
  return (
    <>
      <section>
        <Nav />
        <Hero />
        <Container>
          <ListingFilter>
            <Filter />
            <Applications />
          </ListingFilter>
        </Container>
        <Cookie />
      </section>
      <Footer />
    </>
  );
}
