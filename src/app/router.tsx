import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './layout';
import { Skeleton } from '../components/ui/Skeleton';

// 14 Lazy-Loaded Routes
const Home = lazy(() => import('../pages/Home').then((m) => ({ default: m.Home })));
const About = lazy(() => import('../pages/About').then((m) => ({ default: m.About })));
const Standards = lazy(() => import('../pages/Standards').then((m) => ({ default: m.Standards })));
const Services = lazy(() => import('../pages/Services').then((m) => ({ default: m.Services })));
const ServiceDetail = lazy(() => import('../pages/ServiceDetail').then((m) => ({ default: m.ServiceDetail })));
const Industries = lazy(() => import('../pages/Industries').then((m) => ({ default: m.Industries })));
const IndustryDetail = lazy(() => import('../pages/IndustryDetail').then((m) => ({ default: m.IndustryDetail })));
const Gallery = lazy(() => import('../pages/Gallery').then((m) => ({ default: m.Gallery })));
const Careers = lazy(() => import('../pages/Careers').then((m) => ({ default: m.Careers })));
const Quote = lazy(() => import('../pages/Quote').then((m) => ({ default: m.Quote })));
const Contact = lazy(() => import('../pages/Contact').then((m) => ({ default: m.Contact })));
const Accessibility = lazy(() => import('../pages/Accessibility').then((m) => ({ default: m.Accessibility })));
const Privacy = lazy(() => import('../pages/Privacy').then((m) => ({ default: m.Privacy })));
const NotFound = lazy(() => import('../pages/NotFound').then((m) => ({ default: m.NotFound })));

const PageFallback = () => (
  <div className="container section" style={{ minHeight: '60vh' }}>
    <Skeleton height="48px" width="300px" />
    <div style={{ marginTop: '24px' }}>
      <Skeleton height="24px" width="600px" />
    </div>
    <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
      <Skeleton height="280px" />
      <Skeleton height="280px" />
      <Skeleton height="280px" />
    </div>
  </div>
);

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<PageFallback />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="about"
          element={
            <Suspense fallback={<PageFallback />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="standards"
          element={
            <Suspense fallback={<PageFallback />}>
              <Standards />
            </Suspense>
          }
        />
        <Route
          path="services"
          element={
            <Suspense fallback={<PageFallback />}>
              <Services />
            </Suspense>
          }
        />
        <Route
          path="services/:slug"
          element={
            <Suspense fallback={<PageFallback />}>
              <ServiceDetail />
            </Suspense>
          }
        />
        <Route
          path="industries"
          element={
            <Suspense fallback={<PageFallback />}>
              <Industries />
            </Suspense>
          }
        />
        <Route
          path="industries/:slug"
          element={
            <Suspense fallback={<PageFallback />}>
              <IndustryDetail />
            </Suspense>
          }
        />
        <Route
          path="gallery"
          element={
            <Suspense fallback={<PageFallback />}>
              <Gallery />
            </Suspense>
          }
        />
        <Route
          path="careers"
          element={
            <Suspense fallback={<PageFallback />}>
              <Careers />
            </Suspense>
          }
        />
        <Route
          path="quote"
          element={
            <Suspense fallback={<PageFallback />}>
              <Quote />
            </Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense fallback={<PageFallback />}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="accessibility"
          element={
            <Suspense fallback={<PageFallback />}>
              <Accessibility />
            </Suspense>
          }
        />
        <Route
          path="privacy"
          element={
            <Suspense fallback={<PageFallback />}>
              <Privacy />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<PageFallback />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};
