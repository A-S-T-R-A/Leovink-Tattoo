import { _ as __astro_tag_component__, c as createAstro, a as createComponent, r as renderTemplate, e as renderComponent } from '../astro.14afed36.mjs';
import 'html-escaper';
import { C as ChevronDownIcon, M as ModalGallery, S as Section, B as Button, j as AntiClockwiseIcon, G as GalleryGrid, g as getLangFromUrl, i as fetchImagesData, f as fetchGlobalData, P as PageWrapper, c as cave, $ as $$Layout } from './_...artistSlug_.astro.91cf3a92.mjs';
import { useMemo, useState, useEffect } from 'preact/hooks';
import { s as styles, a as styles$1 } from '../portfolio.bcf6549b.d2806bf4.mjs';
import { jsxs, jsx, Fragment } from 'preact/jsx-runtime';
import { F as FormSection } from './contact.astro.bbe35a68.mjs';

function Dropdown(props) {
  const {
    className,
    error,
    value,
    id,
    onChange,
    options,
    firstOptionText = "Select an option"
  } = props;
  const newOptions = useMemo(() => options.map((i, ind) => ({
    ...i,
    id: ind
  })), [options]);
  const handleChange = (event) => {
    const target = event.target;
    onChange?.(target.value);
  };
  return jsxs("div", {
    className: styles.container,
    children: [jsx(ChevronDownIcon, {
      className: styles.chevron
    }), jsxs("select", {
      "data-testid": "dropdown-label",
      className: styles.select,
      value,
      onChange: handleChange,
      children: [jsx("option", {
        "data-testid": "dropdown-option-base",
        value: "",
        children: firstOptionText
      }), newOptions.map((option) => jsx("option", {
        "data-testid": `dropdown-option ${option.id}`,
        value: option.value,
        children: option.label
      }, option.value))]
    })]
  });
}
__astro_tag_component__(Dropdown, "@astrojs/preact");

function PortfolioPage({
  formTitle,
  formData,
  button,
  globalFiltersData,
  fetchedData,
  language
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const f = {};
  globalFiltersData && globalFiltersData.filters.forEach((item) => f[item.title[language]] = "");
  const [filters, setFilters] = useState(f);
  const [filtersData, setFiltersData] = useState(() => globalFiltersData?.filters || []);
  const keys = filtersData.map((item) => item.title.en);
  const data = filter(fetchedData, keys);
  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    const keys2 = filtersData.map((item) => item.title.en);
    const data2 = filter(fetchedData, keys2);
    setFilteredData(data2);
  }, [filters, fetchedData]);
  function filter(data2, keys2 = []) {
    if (!filters)
      return [];
    if (keys2.length === 0)
      return data2;
    const newData = data2.filter((item) => {
      return filters[keys2[0]] === "" ? true : filters[keys2[0]] === "Unassigned" ? item.filters[keys2[0]] === "" : item.filters[keys2[0]] === filters[keys2[0]];
    });
    return filter(newData, keys2.slice(1));
  }
  function resetFiltersHandler() {
    if (!filtersData)
      return;
    const initialFilters = {};
    filtersData.forEach((item) => initialFilters[item.title[language]] = "");
    setFilters(initialFilters);
  }
  function clickHandler(index) {
    const newModalData = [...filteredData.slice(index), ...filteredData.slice(0, index)];
    setIsOpen(true);
    setModalData(newModalData);
  }
  const dropdownOptions = useMemo(() => {
    return globalFiltersData?.filters.map((item) => ({
      name: item.title[language],
      options: item.items.map((innerItem) => ({
        label: innerItem.label[language],
        value: innerItem.key
      }))
    }));
  }, [globalFiltersData]);
  return jsxs(Fragment, {
    children: [jsx(ModalGallery, {
      data: modalData,
      isOpen,
      onClose: () => setIsOpen(false),
      language
    }), jsxs(Section, {
      children: [jsxs("div", {
        className: styles$1.filters,
        children: [dropdownOptions?.map((item, index) => {
          const {
            name,
            options
          } = item;
          return jsx(Dropdown, {
            options,
            firstOptionText: `All ${name}`,
            value: filters?.[name] || "",
            onChange: (value) => setFilters((prev) => ({
              ...prev,
              [name]: value
            }))
          }, index);
        }), globalFiltersData && jsxs(Button, {
          className: styles$1.btn,
          onClick: resetFiltersHandler,
          children: [globalFiltersData?.reset[language], jsx(AntiClockwiseIcon, {})]
        })]
      }), jsx(GalleryGrid, {
        data: filteredData,
        onClick: clickHandler,
        language
      }), jsx("div", {
        className: styles$1.marginBottom
      }), jsx(FormSection, {
        title: formTitle,
        data: formData,
        button
      })]
    })]
  });
}
__astro_tag_component__(PortfolioPage, "@astrojs/preact");

const $$Astro$2 = createAstro();
const $$Portfolio$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Portfolio$2;
  const language = getLangFromUrl(Astro2.url);
  let imagesData = null;
  let globalData = null;
  try {
    imagesData = await fetchImagesData();
    globalData = await fetchGlobalData();
  } catch (e) {
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "image": cave }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "PageWrapper", PageWrapper, { "title": globalData?.layoutData.navList[language][1].text || "Portfolio", "main": globalData?.layoutData.navList[language][0].text || "Main" }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "PortfolioPage", PortfolioPage, { "client:load": true, "formTitle": globalData?.sectionNames[language].form || "Book an appointment", "formData": globalData?.formData[language] || null, "button": globalData?.buttons[language].cta || "Book an appointment", "globalFiltersData": globalData?.filtersData || null, "fetchedData": imagesData || [], "language": language, "client:component-hydration": "load", "client:component-path": "pageComponents/PortfolioPage/PortfolioPage", "client:component-export": "PortfolioPage" })}
    ` })}
` })}`;
}, "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/portfolio.astro");

const $$file$2 = "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/portfolio.astro";
const $$url$2 = "/portfolio";

const portfolio$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Portfolio$2,
    file: $$file$2,
    url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro();
const $$Portfolio$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Portfolio$1;
  const language = getLangFromUrl(Astro2.url);
  let imagesData = null;
  let globalData = null;
  try {
    imagesData = await fetchImagesData();
    globalData = await fetchGlobalData();
  } catch (e) {
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "image": cave }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "PageWrapper", PageWrapper, { "title": globalData?.layoutData.navList[language][1].text || "Portfolio", "main": globalData?.layoutData.navList[language][0].text || "Main" }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "PortfolioPage", PortfolioPage, { "client:load": true, "formTitle": globalData?.sectionNames[language].form || "Book an appointment", "formData": globalData?.formData[language] || null, "button": globalData?.buttons[language].cta || "Book an appointment", "globalFiltersData": globalData?.filtersData || null, "fetchedData": imagesData || [], "language": language, "client:component-hydration": "load", "client:component-path": "pageComponents/PortfolioPage/PortfolioPage", "client:component-export": "PortfolioPage" })}
    ` })}
` })}`;
}, "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ro/portfolio.astro");

const $$file$1 = "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ro/portfolio.astro";
const $$url$1 = "/ro/portfolio";

const portfolio$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Portfolio$1,
    file: $$file$1,
    url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$Portfolio = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Portfolio;
  const language = getLangFromUrl(Astro2.url);
  let imagesData = null;
  let globalData = null;
  try {
    imagesData = await fetchImagesData();
    globalData = await fetchGlobalData();
  } catch (e) {
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "image": cave }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "PageWrapper", PageWrapper, { "title": globalData?.layoutData.navList[language][1].text || "Portfolio", "main": globalData?.layoutData.navList[language][0].text || "Main" }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "PortfolioPage", PortfolioPage, { "client:load": true, "formTitle": globalData?.sectionNames[language].form || "Book an appointment", "formData": globalData?.formData[language] || null, "button": globalData?.buttons[language].cta || "Book an appointment", "globalFiltersData": globalData?.filtersData || null, "fetchedData": imagesData || [], "language": language, "client:component-hydration": "load", "client:component-path": "pageComponents/PortfolioPage/PortfolioPage", "client:component-export": "PortfolioPage" })}
    ` })}
` })}`;
}, "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ru/portfolio.astro");

const $$file = "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ru/portfolio.astro";
const $$url = "/ru/portfolio";

const portfolio = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Portfolio,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { portfolio$1 as a, portfolio as b, portfolio$2 as p };
