import { _ as __astro_tag_component__, c as createAstro, a as createComponent, r as renderTemplate, e as renderComponent } from '../astro.14afed36.mjs';
import 'html-escaper';
import { S as Section, F as Form, g as getLangFromUrl, f as fetchGlobalData, P as PageWrapper, c as cave, $ as $$Layout } from './_...artistSlug_.astro.91cf3a92.mjs';
import { s as styles } from '../portfolio.a5fa6088.d03e9c71.mjs';
import { jsx, jsxs, Fragment } from 'preact/jsx-runtime';
import { s as styles$1 } from '../contact.653d1dac.5828d143.mjs';

function FormSection({
  data,
  title,
  button
}) {
  if (!data)
    return null;
  return jsx(Section, {
    wrapperClassName: styles.wrapper,
    children: jsx(Form, {
      className: styles.form,
      data,
      title,
      cta: button
    })
  });
}
__astro_tag_component__(FormSection, "@astrojs/preact");

const BR = "*br/*";
const B = ["*b*", "*/b*"];
function DecodeMarkdown({
  data
}) {
  function findBoldWords(d) {
    if (d.indexOf(B[0]) > d.indexOf(B[1]))
      return d;
    if (d.lastIndexOf(B[1]) < d.lastIndexOf(B[0]))
      return d;
    if (d.split(B[0]).length !== d.split(B[1]).length)
      return d;
    const arr = [];
    let stack = d;
    while (stack.includes(B[0])) {
      const s = stack.indexOf(B[0]);
      const f = stack.indexOf(B[1]);
      arr.push({
        text: stack.slice(0, s),
        isBold: false
      });
      arr.push({
        text: stack.slice(s + B[0].length, f),
        isBold: true
      });
      stack = stack.slice(f + B[1].length);
    }
    arr.push({
      text: stack,
      isBold: false
    });
    return arr.map(({
      text,
      isBold
    }) => {
      if (text.includes(BR)) {
        const content2 = text.split(BR).map((innerItem, innerIndex, innerArray) => {
          if (innerIndex !== innerArray.length - 1) {
            return jsxs(Fragment, {
              children: [innerItem, jsx("br", {})]
            });
          }
          return innerItem;
        });
        return isBold ? jsx("strong", {
          children: content2
        }) : content2;
      } else {
        if (isBold) {
          return jsx("strong", {
            children: text
          });
        }
        return text;
      }
    });
  }
  const content = findBoldWords(data);
  return jsx("p", {
    children: content
  });
}
__astro_tag_component__(DecodeMarkdown, "@astrojs/preact");

function FindUs({
  data
}) {
  return jsx(Section, {
    children: jsxs("div", {
      className: styles$1.container,
      children: [data && jsx(DecodeMarkdown, {
        data
      }), jsxs("div", {
        className: styles$1.mapContainer,
        children: [jsx("a", {
          href: "https://yandex.ru/maps/org/leovink_tattoo_studio/184496310101/?utm_medium=mapframe&utm_source=maps",
          style: "color:#eee;font-size:12px;position:absolute;top:0px;left:10px",
          children: "Leovink Tattoo Studio"
        }), jsx("a", {
          href: "https://yandex.ru/maps/10313/kishinev/category/tattoo_studio/184105820/?utm_medium=mapframe&utm_source=maps",
          style: "color:#eee;font-size:12px;position:absolute;top:14px;left:10px",
          children: "Salon de tatuaje in Chisinau"
        }), jsx("iframe", {
          src: "https://yandex.ru/map-widget/v1/?ll=28.842155%2C47.013226&mode=search&oid=184496310101&ol=biz&z=17.03",
          frameBorder: "1",
          className: styles$1.map
        })]
      })]
    })
  });
}
__astro_tag_component__(FindUs, "@astrojs/preact");

const $$Astro$2 = createAstro();
const $$Contact$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Contact$2;
  const language = getLangFromUrl(Astro2.url);
  let globalData = null;
  try {
    globalData = await fetchGlobalData();
  } catch (e) {
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "image": cave }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "PageWrapper", PageWrapper, { "title": globalData?.layoutData.navList[language][3].text || "Contact", "main": globalData?.layoutData.navList[language][0].text || "Main" }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "FindUs", FindUs, { "data": globalData?.contactsGuide[language] || null })}
        ${renderComponent($$result3, "FormSection", FormSection, { "client:load": true, "title": globalData?.sectionNames[language].form || "Book an appointment", "button": globalData?.buttons[language].cta || "book an appointment", "data": globalData?.formData[language] || null, "client:component-hydration": "load", "client:component-path": "widgets/FormSection/FormSection", "client:component-export": "FormSection" })}
    ` })}
` })}`;
}, "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/contact.astro");

const $$file$2 = "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/contact.astro";
const $$url$2 = "/contact";

const contact$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Contact$2,
    file: $$file$2,
    url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro();
const $$Contact$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Contact$1;
  const language = getLangFromUrl(Astro2.url);
  let globalData = null;
  try {
    globalData = await fetchGlobalData();
  } catch (e) {
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "image": cave }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "PageWrapper", PageWrapper, { "title": globalData?.layoutData.navList[language][3].text || "Contact", "main": globalData?.layoutData.navList[language][0].text || "Main" }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "FindUs", FindUs, { "data": globalData?.contactsGuide[language] || null })}
        ${renderComponent($$result3, "FormSection", FormSection, { "client:load": true, "title": globalData?.sectionNames[language].form || "Book an appointment", "button": globalData?.buttons[language].cta || "book an appointment", "data": globalData?.formData[language] || null, "client:component-hydration": "load", "client:component-path": "widgets/FormSection/FormSection", "client:component-export": "FormSection" })}
    ` })}
` })}`;
}, "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ro/contact.astro");

const $$file$1 = "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ro/contact.astro";
const $$url$1 = "/ro/contact";

const contact$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Contact$1,
    file: $$file$1,
    url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Contact;
  const language = getLangFromUrl(Astro2.url);
  let globalData = null;
  try {
    globalData = await fetchGlobalData();
  } catch (e) {
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "image": cave }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "PageWrapper", PageWrapper, { "title": globalData?.layoutData.navList[language][3].text || "Contact", "main": globalData?.layoutData.navList[language][0].text || "Main" }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "FindUs", FindUs, { "data": globalData?.contactsGuide[language] || null })}
        ${renderComponent($$result3, "FormSection", FormSection, { "client:load": true, "title": globalData?.sectionNames[language].form || "Book an appointment", "button": globalData?.buttons[language].cta || "book an appointment", "data": globalData?.formData[language] || null, "client:component-hydration": "load", "client:component-path": "widgets/FormSection/FormSection", "client:component-export": "FormSection" })}
    ` })}
` })}`;
}, "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ru/contact.astro");

const $$file = "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ru/contact.astro";
const $$url = "/ru/contact";

const contact = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Contact,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { FormSection as F, contact$1 as a, contact as b, contact$2 as c };
