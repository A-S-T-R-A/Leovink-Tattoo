import { _ as __astro_tag_component__, c as createAstro, a as createComponent, r as renderTemplate, e as renderComponent } from '../astro.14afed36.mjs';
import 'html-escaper';
import { g as getLangFromUrl, d as fetchSectionData, f as fetchGlobalData, P as PageWrapper, S as Section, c as cave, $ as $$Layout } from './_...artistSlug_.astro.8d409370.mjs';
import { F as FormSection } from './contact.astro.aa016e35.mjs';
import { T as Testimonial } from './index.astro.ebd27098.mjs';
import { jsx, Fragment } from 'preact/jsx-runtime';

function TestimonialPage({
  data,
  cta
}) {
  return jsx(Fragment, {
    children: data.map((item, index, array) => jsx(Testimonial, {
      isReversed: true,
      isWithBorder: index !== array.length - 1,
      data: item,
      cta
    }, index))
  });
}
__astro_tag_component__(TestimonialPage, "@astrojs/preact");

const $$Astro$2 = createAstro();
const $$Testimonials$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Testimonials$2;
  const language = getLangFromUrl(Astro2.url);
  const testimonialsData = await fetchSectionData(language, "testimonials");
  const globalData = await fetchGlobalData();
  const { sectionNames, buttons, formData, layoutData } = globalData;
  const { cta } = buttons[language];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "image": cave }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "PageWrapper", PageWrapper, { "title": layoutData.navList[language][4].text, "main": layoutData.navList[language][0].text }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "Section", Section, {}, { "default": ($$result4) => renderTemplate`
            ${renderComponent($$result4, "TestimonialPage", TestimonialPage, { "client:load": true, "cta": cta, "data": testimonialsData, "client:component-hydration": "load", "client:component-path": "pageComponents/TestimonialsPage/TestimonialsPage", "client:component-export": "TestimonialPage" })}
        ` })}
        ${renderComponent($$result3, "FormSection", FormSection, { "client:load": true, "title": sectionNames[language].form, "button": cta, "data": formData[language], "client:component-hydration": "load", "client:component-path": "widgets/FormSection/FormSection", "client:component-export": "FormSection" })}
    ` })}
` })}`;
}, "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/testimonials.astro");

const $$file$2 = "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/testimonials.astro";
const $$url$2 = "/testimonials";

const testimonials$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Testimonials$2,
    file: $$file$2,
    url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro();
const $$Testimonials$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Testimonials$1;
  const language = getLangFromUrl(Astro2.url);
  const testimonialsData = await fetchSectionData(language, "testimonials");
  const globalData = await fetchGlobalData();
  const { sectionNames, buttons, formData, layoutData } = globalData;
  const { cta } = buttons[language];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "image": cave }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "PageWrapper", PageWrapper, { "title": layoutData.navList[language][4].text, "main": layoutData.navList[language][0].text }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "Section", Section, {}, { "default": ($$result4) => renderTemplate`
            ${renderComponent($$result4, "TestimonialPage", TestimonialPage, { "client:load": true, "cta": cta, "data": testimonialsData, "client:component-hydration": "load", "client:component-path": "pageComponents/TestimonialsPage/TestimonialsPage", "client:component-export": "TestimonialPage" })}
        ` })}
        ${renderComponent($$result3, "FormSection", FormSection, { "client:load": true, "title": sectionNames[language].form, "button": cta, "data": formData[language], "client:component-hydration": "load", "client:component-path": "widgets/FormSection/FormSection", "client:component-export": "FormSection" })}
    ` })}
` })}`;
}, "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ro/testimonials.astro");

const $$file$1 = "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ro/testimonials.astro";
const $$url$1 = "/ro/testimonials";

const testimonials$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Testimonials$1,
    file: $$file$1,
    url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$Testimonials = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Testimonials;
  const language = getLangFromUrl(Astro2.url);
  const testimonialsData = await fetchSectionData(language, "testimonials");
  const globalData = await fetchGlobalData();
  const { sectionNames, buttons, formData, layoutData } = globalData;
  const { cta } = buttons[language];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "image": cave }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "PageWrapper", PageWrapper, { "title": layoutData.navList[language][4].text, "main": layoutData.navList[language][0].text }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "Section", Section, {}, { "default": ($$result4) => renderTemplate`
            ${renderComponent($$result4, "TestimonialPage", TestimonialPage, { "client:load": true, "cta": cta, "data": testimonialsData, "client:component-hydration": "load", "client:component-path": "pageComponents/TestimonialsPage/TestimonialsPage", "client:component-export": "TestimonialPage" })}
        ` })}
        ${renderComponent($$result3, "FormSection", FormSection, { "client:load": true, "title": sectionNames[language].form, "button": cta, "data": formData[language], "client:component-hydration": "load", "client:component-path": "widgets/FormSection/FormSection", "client:component-export": "FormSection" })}
    ` })}
` })}`;
}, "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ru/testimonials.astro");

const $$file = "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ru/testimonials.astro";
const $$url = "/ru/testimonials";

const testimonials = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Testimonials,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { testimonials$1 as a, testimonials as b, testimonials$2 as t };
