import React from 'react';
import Nav from '../components/nav/nav';
import Hero from '../components/hero/hero';
import Container from '../components/container/container';
import Cookie from '../components/cookie/cookie';
import Footer from '../components/footer/footer';
import ListingFilter from '../components/listings_filter/listings_fillter';
import SearchResult from '../components/search/search_result';
import Filter from '../components/filter/filter';

export default function ListingsPage() {
  return (
    <>
      <section>
        <Nav />
        <Hero />
        <Container>
          <ListingFilter>
            <Filter />
            <SearchResult />
          </ListingFilter>
        </Container>
        <Cookie />
      </section>
      <Footer />
    </>
  );
}
