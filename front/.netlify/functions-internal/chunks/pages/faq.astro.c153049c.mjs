import { _ as __astro_tag_component__, c as createAstro, a as createComponent, r as renderTemplate, e as renderComponent } from '../astro.14afed36.mjs';
import 'html-escaper';
import { T as Typography, a as PlusIcon, b as classNames, g as getLangFromUrl, d as fetchSectionData, f as fetchGlobalData, P as PageWrapper, S as Section, c as cave, $ as $$Layout } from './_...artistSlug_.astro.8d409370.mjs';
import { F as FormSection } from './contact.astro.aa016e35.mjs';
import { useState } from 'preact/hooks';
import { s as styles } from '../faq.bcd3d602.d98b6c55.mjs';
import { jsxs, jsx, Fragment } from 'preact/jsx-runtime';

function FaqBlock({
  data,
  isWithoutTitle
}) {
  const {
    title,
    questions
  } = data;
  const [expandedQuestions, setExpandedQuestions] = useState([]);
  function questionClickHandler(index) {
    if (!expandedQuestions?.includes(index)) {
      setExpandedQuestions((prev) => [...prev, index]);
    }
  }
  function iconClickHandler(e, index) {
    e.stopPropagation();
    if (!expandedQuestions?.includes(index)) {
      setExpandedQuestions((prev) => [...prev, index]);
    } else {
      setExpandedQuestions((prev) => prev.filter((el) => el !== index));
    }
  }
  return jsxs("div", {
    className: styles.container,
    children: [!isWithoutTitle && jsx(Typography, {
      tag: "h2",
      size: "xxxl",
      weight: "five",
      className: styles.title,
      children: title
    }), jsx("div", {
      className: styles.list,
      children: questions.map((item, index) => {
        const {
          question,
          answer
        } = item;
        const isExpanded = expandedQuestions.includes(index);
        return jsxs("div", {
          className: styles.listItem,
          children: [jsxs("div", {
            className: styles.question,
            onClick: () => questionClickHandler(index),
            children: [jsx(Typography, {
              tag: "h3",
              size: "xl",
              className: styles.questionTitle,
              children: question
            }), jsx("div", {
              onClick: (e) => iconClickHandler(e, index),
              children: jsx(PlusIcon, {
                className: classNames(styles.icon, {
                  [styles.rotated]: isExpanded
                })
              })
            })]
          }), jsx("div", {
            className: classNames(styles.answerContainer, {
              [styles.isOpen]: isExpanded
            }, []),
            children: jsx("div", {
              children: jsx(Typography, {
                tag: "p",
                color: "lightgray",
                className: styles.answer,
                children: answer
              })
            })
          })]
        }, index);
      })
    })]
  });
}
__astro_tag_component__(FaqBlock, "@astrojs/preact");

function FAQPage({
  data
}) {
  return jsx(Fragment, {
    children: data.map((item) => jsx(FaqBlock, {
      data: item
    }))
  });
}
__astro_tag_component__(FAQPage, "@astrojs/preact");

const $$Astro$2 = createAstro();
const $$Faq$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Faq$2;
  const language = getLangFromUrl(Astro2.url);
  const faqData = await fetchSectionData(language, "faq");
  const globalData = await fetchGlobalData();
  const { sectionNames, buttons, formData, layoutData } = globalData;
  const { cta } = buttons[language];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "image": cave }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "PageWrapper", PageWrapper, { "title": layoutData.navList[language][2].text, "main": layoutData.navList[language][0].text }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "Section", Section, {}, { "default": ($$result4) => renderTemplate`
            ${renderComponent($$result4, "FAQPage", FAQPage, { "client:load": true, "data": faqData.filter((item) => item.title !== "index"), "client:component-hydration": "load", "client:component-path": "pageComponents/FAQPage/FAQPage", "client:component-export": "FAQPage" })}
        ` })}
        ${renderComponent($$result3, "FormSection", FormSection, { "client:load": true, "title": sectionNames[language].form, "button": cta, "data": formData[language], "client:component-hydration": "load", "client:component-path": "widgets/FormSection/FormSection", "client:component-export": "FormSection" })}
    ` })}
` })}`;
}, "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/faq.astro");

const $$file$2 = "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/faq.astro";
const $$url$2 = "/faq";

const faq$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Faq$2,
    file: $$file$2,
    url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro();
const $$Faq$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Faq$1;
  const language = getLangFromUrl(Astro2.url);
  const faqData = await fetchSectionData(language, "faq");
  const globalData = await fetchGlobalData();
  const { sectionNames, buttons, formData, layoutData } = globalData;
  const { cta } = buttons[language];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "image": cave }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "PageWrapper", PageWrapper, { "title": layoutData.navList[language][2].text, "main": layoutData.navList[language][0].text }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "Section", Section, {}, { "default": ($$result4) => renderTemplate`
            ${renderComponent($$result4, "FAQPage", FAQPage, { "client:load": true, "data": faqData.filter((item) => item.title !== "index"), "client:component-hydration": "load", "client:component-path": "pageComponents/FAQPage/FAQPage", "client:component-export": "FAQPage" })}
        ` })}
        ${renderComponent($$result3, "FormSection", FormSection, { "client:load": true, "title": sectionNames[language].form, "button": cta, "data": formData[language], "client:component-hydration": "load", "client:component-path": "widgets/FormSection/FormSection", "client:component-export": "FormSection" })}
    ` })}
` })}`;
}, "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ro/faq.astro");

const $$file$1 = "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ro/faq.astro";
const $$url$1 = "/ro/faq";

const faq$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Faq$1,
    file: $$file$1,
    url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$Faq = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Faq;
  const language = getLangFromUrl(Astro2.url);
  const faqData = await fetchSectionData(language, "faq");
  const globalData = await fetchGlobalData();
  const { sectionNames, buttons, formData, layoutData } = globalData;
  const { cta } = buttons[language];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "image": cave }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "PageWrapper", PageWrapper, { "title": layoutData.navList[language][2].text, "main": layoutData.navList[language][0].text }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "Section", Section, {}, { "default": ($$result4) => renderTemplate`
            ${renderComponent($$result4, "FAQPage", FAQPage, { "client:load": true, "data": faqData.filter((item) => item.title !== "index"), "client:component-hydration": "load", "client:component-path": "pageComponents/FAQPage/FAQPage", "client:component-export": "FAQPage" })}
        ` })}
        ${renderComponent($$result3, "FormSection", FormSection, { "client:load": true, "title": sectionNames[language].form, "button": cta, "data": formData[language], "client:component-hydration": "load", "client:component-path": "widgets/FormSection/FormSection", "client:component-export": "FormSection" })}
    ` })}
` })}`;
}, "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ru/faq.astro");

const $$file = "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ru/faq.astro";
const $$url = "/ru/faq";

const faq = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Faq,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { FaqBlock as F, faq$1 as a, faq as b, faq$2 as f };
