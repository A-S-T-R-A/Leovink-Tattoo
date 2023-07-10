import { _ as __astro_tag_component__, c as createAstro, a as createComponent, r as renderTemplate, b as addAttribute, d as renderHead, e as renderComponent, f as renderSlot } from '../astro.14afed36.mjs';
import 'html-escaper';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { useState, useRef, useEffect, useCallback, useMemo } from 'preact/hooks';
import { s as styles$1, a as styles$2, b as styles$3, c as styles$4, d as styles$5, e as styles$6, f as styles$8, g as styles$9 } from '../_...artistSlug_.87481691.63f46661.mjs';
import { s as styles } from '../index.1332a7c9.a0d19c09.mjs';
import { jsx, jsxs, Fragment } from 'preact/jsx-runtime';
import { s as styles$7 } from '../_...artistSlug_.eadb71ac.7657e9a8.mjs';
import { s as styles$i } from '../_...artistSlug_.20d39c4c.9f6e55be.mjs';
import { s as styles$a } from '../_...artistSlug_.88091b59.3bcd1127.mjs';
import { s as styles$e, a as styles$f, b as styles$g, c as styles$h } from '../_...artistSlug_.97ee5e3b.ddd44db2.mjs';
import emailjs from '@emailjs/browser';
import { s as styles$d } from '../portfolio.dfc1b224.8089ad6f.mjs';
import { AiOutlineLoading3Quarters, AiOutlineCheckCircle } from 'react-icons/ai/index.esm.js';
import { BiErrorCircle } from 'react-icons/bi/index.esm.js';
import { c as cls } from '../index.64369eb8.6b42ba8f.mjs';
import { createPortal } from 'preact/compat';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { s as styles$b, a as styles$c } from '../_...artistSlug_.b11b3c3e.46ea5a25.mjs';
import { s as styles$j } from '../_...artistSlug_.cad72046.7938f771.mjs';

function classNames(cls, mods = {}, additional = []) {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods).filter(([_, value]) => Boolean(value)).map(([className]) => className)
  ].join(" ");
}

function AppLink(props) {
  const {
    to,
    children,
    className,
    ...otherProps
  } = props;
  return jsx("a", {
    href: to,
    className: classNames(styles.link, {}, [className]),
    ...otherProps,
    children
  });
}
__astro_tag_component__(AppLink, "@astrojs/preact");

const firebaseConfig = {
  apiKey: "AIzaSyDOm3cIIX2REj94_4KSY-oU-BTEfbMBkBE",
  authDomain: "leovink-tattoo.firebaseapp.com",
  projectId: "leovink-tattoo",
  storageBucket: "leovink-tattoo.appspot.com",
  messagingSenderId: "969237374614",
  appId: "1:969237374614:web:1f64ff0baef003378cc4b7"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const PORTFOLIO_PICTURES_DB = "dev_portfolio_pictures" ;
const DATA_COLLECTION = "dev_data" ;
const LANGUAGE_DOCUMENT = {
  en: "english",
  ro: "romanian",
  ru: "russian"
};
const GLOBAL_DATA = "global";
const SECTION_COLLECTION = {
  steps: "steps",
  services: "services",
  artists: "artists",
  faq: "faq",
  testimonials: "testimonials",
  layout: "layout",
  other: "other"
};
function reformatAndSortObjectValuesToArray(obj) {
  const sortedObject = sortObjectData(obj);
  return Object.values(sortedObject);
}
function reformatObjectValuesToArray(obj) {
  return Object.values(obj);
}
async function fetchSectionData(language, section, raw) {
  const ref = collection(
    db,
    DATA_COLLECTION,
    LANGUAGE_DOCUMENT[language],
    SECTION_COLLECTION[section]
  );
  const docs = await getDocs(ref);
  if (docs.empty)
    throw new Error();
  const newData = docs.docs[0].data();
  const reformattedNewData = reformatObjectValuesToArray(newData);
  const data = !!raw ? newData : reformattedNewData;
  return data;
}
function sortObjectData(obj) {
  if (!obj)
    return {};
  const sortedKeys = Object.keys(obj).sort((a, b) => Number(a) - Number(b));
  const sortedObject = {};
  for (const key of sortedKeys) {
    sortedObject[key] = { id: +key, ...obj[key] };
  }
  return sortedObject;
}
async function fetchImagesData() {
  const ref = collection(db, PORTFOLIO_PICTURES_DB);
  const docs = await getDocs(ref);
  if (docs.empty)
    throw new Error();
  const currentData = docs.docs[0].data();
  const ascSortedData = sortObjectData(currentData);
  const dataArray = reformatObjectValuesToArray(ascSortedData);
  const liveData = dataArray.filter((item) => item.filters.isLive);
  return liveData;
}
collection(db, PORTFOLIO_PICTURES_DB);
async function fetchGlobalData() {
  const ref = doc(db, DATA_COLLECTION, GLOBAL_DATA);
  const newDoc = await getDoc(ref);
  const newData = newDoc.data();
  return newData;
}

function NavigationList(props) {
  const {
    closeClickHandler,
    className,
    data
  } = props;
  const arrayData = reformatAndSortObjectValuesToArray(data);
  return jsx("ul", {
    className: classNames(styles$1.list, {}, [className]),
    children: arrayData.map((item) => {
      return jsx("li", {
        className: styles$1.item,
        onClick: closeClickHandler,
        children: jsx(AppLink, {
          to: item.link,
          className: styles$1.undreline,
          children: item.text
        })
      });
    })
  });
}
__astro_tag_component__(NavigationList, "@astrojs/preact");

function SocialIcons({
  onClick,
  className,
  data
}) {
  const containerClassName = classNames(styles$2.socials, {}, [className]);
  const socialsData = reformatAndSortObjectValuesToArray(data);
  return jsx("div", {
    onClick,
    className: containerClassName,
    children: socialsData.map((item, index) => {
      const alt = index === 0 ? "instagram" : index === 1 ? "facebook" : "viber";
      return jsx("a", {
        className: styles$2.item,
        href: item.link,
        target: "_blank",
        rel: "noreferrer",
        children: jsx("img", {
          src: item.icon,
          alt
        })
      }, index);
    })
  });
}
__astro_tag_component__(SocialIcons, "@astrojs/preact");

function InstagramIcon({
  className
}) {
  return jsx("svg", {
    version: "1.1",
    id: "Layer_1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "24px",
    height: "24px",
    viewBox: "0 0 100 100",
    fill: "white",
    className: classNames("", {}, [className]),
    children: jsxs("g", {
      children: [jsx("path", {
        d: "M50.3,29c-11.6,0-21.1,9.5-21.1,21.1s9.5,21.1,21.1,21.1c11.6,0,21-9.5,21-21.1S61.8,29,50.3,29z M50.3,66.2\r\n		c-8.9,0-16.1-7.2-16.1-16.1c0-8.9,7.2-16.1,16.1-16.1c8.8,0,16,7.2,16,16.1C66.3,59,59.1,66.2,50.3,66.2z"
      }), jsx("path", {
        d: "M73.8,17.1c-2.2,0-4.2,0.8-5.7,2.3c-1.5,1.5-2.3,3.5-2.3,5.7c0,2.2,0.8,4.2,2.3,5.7c1.5,1.5,3.5,2.3,5.7,2.3\r\n		s4.2-0.8,5.7-2.3v0c1.4-1.4,2.3-3.4,2.4-5.6l0-0.1c0-2.1-0.9-4.1-2.3-5.5C78.1,18,76,17.1,73.8,17.1z M75.9,27.2\r\n		c-1.1,1.1-3.2,1.1-4.3,0c-0.6-0.6-0.9-1.3-0.9-2.1s0.3-1.6,0.9-2.1c0.6-0.6,1.3-0.9,2.1-0.9c0.8,0,1.6,0.3,2.2,0.9\r\n		c0.5,0.5,0.9,1.3,0.9,2C76.8,25.9,76.5,26.7,75.9,27.2z"
      }), jsx("path", {
        d: "M67.8,7H32.7C18.6,7,7.2,18.4,7.2,32.5v35.2c0,14.1,11.4,25.5,25.5,25.5h35.2c14.1,0,25.5-11.4,25.5-25.5V32.5\r\n		C93.3,18.4,81.9,7,67.8,7z M88.3,67.7c0,11.3-9.2,20.5-20.5,20.5H32.7c-11.3,0-20.5-9.2-20.5-20.5V32.5c0-11.3,9.2-20.5,20.5-20.5\r\n		h35.2c11.3,0,20.5,9.2,20.5,20.5V67.7z"
      })]
    })
  });
}
__astro_tag_component__(InstagramIcon, "@astrojs/preact");

function FacebookIcon({
  className
}) {
  return jsx("svg", {
    version: "1.1",
    width: "24px",
    height: "24px",
    viewBox: "0 0 512 512",
    fill: "white",
    xmlns: "http://www.w3.org/2000/svg",
    className: classNames("", {}, [className]),
    children: jsx("g", {
      children: jsx("path", {
        d: "M308.3,508.5c-2.5,0.1-4.1,0.3-5.7,0.3c-34.2,0-68.3-0.1-102.5,0.1c-4.8,0-6.1-1.3-6.1-6.1c0.1-79.6,0.1-159.3,0.1-238.9   c0-2.1,0-4.2,0-6.9c-18.6,0-36.7,0-55.1,0c0-28.4,0-56.3,0-85c1.9,0,3.7,0,5.4,0c15,0,30-0.1,45,0.1c3.8,0,4.8-1.1,4.8-4.8   c-0.2-22.3-0.2-44.7,0-67c0.1-15.6,2.6-30.8,9.8-44.9c10.3-19.9,26.6-32.8,47.2-40.8c16.8-6.6,34.5-9,52.3-9.3   c29-0.4,58-0.2,87-0.3c2.7,0,4.9-0.1,4.9,3.7c-0.1,27.5-0.1,55-0.1,82.5c0,0.3-0.1,0.6-0.5,1.9c-1.7,0-3.6,0-5.5,0   c-18,0-36-0.1-54,0c-10.4,0-18.8,4.2-24.1,13.3c-1.6,2.7-2.6,6.2-2.6,9.4c-0.3,17,0,34-0.2,51c0,4,1.2,5.1,5.1,5.1   c25-0.2,50-0.1,75-0.1c2,0,3.9,0,7.3,0c-3.5,28.6-6.9,56.6-10.4,84.9c-26,0-51.3,0-77.1,0C308.3,340.8,308.3,424.4,308.3,508.5z"
      })
    })
  });
}
__astro_tag_component__(FacebookIcon, "@astrojs/preact");

function ViberIcon({
  className
}) {
  return jsx("svg", {
    role: "img",
    width: "24px",
    height: "24px",
    fill: "white",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    className: classNames("", {}, [className]),
    children: jsx("path", {
      d: "M11.4 0C9.473.028 5.333.344 3.02 2.467 1.302 4.187.696 6.7.633 9.817.57 12.933.488 18.776 6.12 20.36h.003l-.004 2.416s-.037.977.61 1.177c.777.242 1.234-.5 1.98-1.302.407-.44.972-1.084 1.397-1.58 3.85.326 6.812-.416 7.15-.525.776-.252 5.176-.816 5.892-6.657.74-6.02-.36-9.83-2.34-11.546-.596-.55-3.006-2.3-8.375-2.323 0 0-.395-.025-1.037-.017zm.058 1.693c.545-.004.88.017.88.017 4.542.02 6.717 1.388 7.222 1.846 1.675 1.435 2.53 4.868 1.906 9.897v.002c-.604 4.878-4.174 5.184-4.832 5.395-.28.09-2.882.737-6.153.524 0 0-2.436 2.94-3.197 3.704-.12.12-.26.167-.352.144-.13-.033-.166-.188-.165-.414l.02-4.018c-4.762-1.32-4.485-6.292-4.43-8.895.054-2.604.543-4.738 1.996-6.173 1.96-1.773 5.474-2.018 7.11-2.03zm.38 2.602c-.167 0-.303.135-.304.302 0 .167.133.303.3.305 1.624.01 2.946.537 4.028 1.592 1.073 1.046 1.62 2.468 1.633 4.334.002.167.14.3.307.3.166-.002.3-.138.3-.304-.014-1.984-.618-3.596-1.816-4.764-1.19-1.16-2.692-1.753-4.447-1.765zm-3.96.695c-.19-.032-.4.005-.616.117l-.01.002c-.43.247-.816.562-1.146.932-.002.004-.006.004-.008.008-.267.323-.42.638-.46.948-.008.046-.01.093-.007.14 0 .136.022.27.065.4l.013.01c.135.48.473 1.276 1.205 2.604.42.768.903 1.5 1.446 2.186.27.344.56.673.87.984l.132.132c.31.308.64.6.984.87.686.543 1.418 1.027 2.186 1.447 1.328.733 2.126 1.07 2.604 1.206l.01.014c.13.042.265.064.402.063.046.002.092 0 .138-.008.31-.036.627-.19.948-.46.004 0 .003-.002.008-.005.37-.33.683-.72.93-1.148l.003-.01c.225-.432.15-.842-.18-1.12-.004 0-.698-.58-1.037-.83-.36-.255-.73-.492-1.113-.71-.51-.285-1.032-.106-1.248.174l-.447.564c-.23.283-.657.246-.657.246-3.12-.796-3.955-3.955-3.955-3.955s-.037-.426.248-.656l.563-.448c.277-.215.456-.737.17-1.248-.217-.383-.454-.756-.71-1.115-.25-.34-.826-1.033-.83-1.035-.137-.165-.31-.265-.502-.297zm4.49.88c-.158.002-.29.124-.3.282-.01.167.115.312.282.324 1.16.085 2.017.466 2.645 1.15.63.688.93 1.524.906 2.57-.002.168.13.306.3.31.166.003.305-.13.31-.297.025-1.175-.334-2.193-1.067-2.994-.74-.81-1.777-1.253-3.05-1.346h-.024zm.463 1.63c-.16.002-.29.127-.3.287-.008.167.12.31.288.32.523.028.875.175 1.113.422.24.245.388.62.416 1.164.01.167.15.295.318.287.167-.008.295-.15.287-.317-.03-.644-.215-1.178-.58-1.557-.367-.378-.893-.574-1.52-.607h-.018z"
    })
  });
}
__astro_tag_component__(ViberIcon, "@astrojs/preact");

function ArrowDownIcon({
  className
}) {
  return jsx("svg", {
    width: "24px",
    height: "24px",
    viewBox: "0 0 15 15",
    xmlns: "http://www.w3.org/2000/svg",
    className: classNames("", {}, [className]),
    children: jsx("path", {
      d: "M1 1L14 14M14 14V1.52M14 14H1.52",
      stroke: "white",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  });
}
__astro_tag_component__(ArrowDownIcon, "@astrojs/preact");

function ArrowLeftIcon({
  className
}) {
  return jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    width: "24px",
    height: "24px",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: classNames("", {}, [className]),
    children: jsx("path", {
      stroke: "white",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
    })
  });
}
__astro_tag_component__(ArrowLeftIcon, "@astrojs/preact");

function ArrowUpIcon({
  className
}) {
  return jsx("svg", {
    width: "24px",
    height: "24px",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: classNames("", {}, [className]),
    children: jsx("path", {
      d: "M1 14L14 1M14 1V13.48M14 1H1.52",
      stroke: "white",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  });
}
__astro_tag_component__(ArrowUpIcon, "@astrojs/preact");

function PlusIcon({
  className
}) {
  return jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "300px",
    height: "300px",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    className: classNames("", {}, [className]),
    children: jsx("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M12 4.5v15m7.5-7.5h-15"
    })
  });
}
__astro_tag_component__(PlusIcon, "@astrojs/preact");

function ChevronDownIcon({
  className
}) {
  return jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    width: "24px",
    height: "24px",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: classNames("", {}, [className]),
    children: jsx("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M19.5 8.25l-7.5 7.5-7.5-7.5"
    })
  });
}
__astro_tag_component__(ChevronDownIcon, "@astrojs/preact");

function MoldovaRepublicFlag() {
  return jsxs("svg", {
    width: "26px",
    height: "26px",
    viewBox: "0 0 64 64",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [jsx("path", {
      d: "M62 32C62 18.9 53.7 7.8 42 3.7V60.3C53.7 56.2 62 45.1 62 32Z",
      fill: "#ED4C5C"
    }), jsx("path", {
      d: "M2 32C2 45.1 10.4 56.2 22 60.3V3.7C10.4 7.8 2 18.9 2 32Z",
      fill: "#2A5F9E"
    }), jsx("path", {
      d: "M42 3.7C38.9 2.6 35.5 2 32 2C28.5 2 25.1 2.6 22 3.7V60.3C25.1 61.4 28.5 62 32 62C35.5 62 38.9 61.4 42 60.3V3.7Z",
      fill: "#FFE62E"
    }), jsx("path", {
      d: "M41.2 30.9H41.3V29.9L40.5 30.5L40.6 30.6L40.5 30.7V30.8H40C39.9 30.9 39.9 31 39.9 31.2V31.6C39.9 31.8 39.8 31.9 39.8 31.9L39.7 32V25.1C39.7 24.5 37.8 22.7 37.8 22.7L35.9 24.2L36 25.4C35.6 25.4 34.1 26.3 33.9 26.3C32.3 25.4 33.4 23.4 33.4 23.3L33.6 23.5C33.6 23.5 33.8 22.7 33.4 22.1L34.2 21.9C34.2 21.9 32.3 20.5 30.5 21.2C30.5 21 30.5 20.9 30.4 20.8L30.2 20.6L30.1 20.9C30.1 21 30 21 29.9 21H29.7V20.8C29.7 20.7 29.7 20.7 29.8 20.6L30.1 20.5L30 20.4C29.8 20.2 29.3 20.2 29.1 20.4L28.9 20.6L29.2 20.7C29.3 20.7 29.3 20.8 29.3 20.9V21H29.1C29 21 29 21 28.9 20.9L28.8 20.7L28.6 20.9C28.5 21 28.5 21.2 28.5 21.3C28.5 21.5 28.5 21.6 28.6 21.7L28.8 21.9L28.9 21.7C28.9 21.6 29 21.6 29.1 21.6H29.3V23C29.3 23.1 29.3 23.1 29.2 23.1L28.7 23.3L29.3 23.4C29.4 23.4 29.5 23.6 29.5 23.7L29.6 24.1L29.7 23.7C29.7 23.6 29.8 23.4 29.9 23.4L30.5 23.3C30.5 23.5 30.8 25.4 29.7 26.2C29.5 26.1 28 25.3 27.6 25.3L27.7 24.1L25.8 22.6C25.8 22.6 23.9 24.4 23.9 25V29.8L23.8 29.7L23.7 29.9C23.7 29.9 23.6 30 23.6 30.1C23.4 29.9 23.2 29.8 23.1 29.8L23 29.7V29.9C23 29.9 22.9 30.4 23 30.7H22.6V30.9C22.6 30.9 22.7 31.4 23.1 31.7C23.3 31.9 23.6 31.9 23.7 31.9L23.9 32.3V32.4C23.7 32.3 23.5 32.3 23.4 32.3H23L23.1 32.5C23.1 32.5 23.2 32.6 23.2 32.7H23L23.1 32.8C23.1 32.8 23.4 33.3 23.8 33.4H24C24 35.8 23.7 40.2 23.7 40.2L26.5 37.7C26.5 37.7 26 38.4 25.9 38.7C25.8 39.1 26.1 40 27.2 39.6L27.1 40.1L28 40.6C27.9 40.7 27.3 40.9 27.3 40.9L31.7 43.8L36.1 40.9C36.1 40.9 33.7 40 32.9 36.8L33.6 36.5C33.9 36.7 35.9 39.3 35.9 39.3L35.8 39.4H35.7C35.6 39.4 35.6 39.5 35.6 40.3V40.5L35.8 40.4C36.5 39.9 36.5 39.9 36.5 39.8C36.5 39.8 36.5 39.7 36.4 39.7H36.5C36.6 39.7 37.1 39.5 37.2 39.3C37.7 38.6 37.4 38 37.4 38C37.6 38.3 39.8 40.2 39.8 40.2C39.8 40.2 39.5 35.9 39.5 33.6L40 32.7H40.1L40.2 32.6V32.5C40.2 32.5 40.3 32.5 40.3 32.4C40.4 32.3 40.4 32.3 40.4 32.2C40.4 32.1 40.4 32.1 40.6 31.9C40.7 31.8 40.8 31.7 40.9 31.7C41.1 31.6 41.2 31.5 41.2 31.4C41.2 31.4 41.2 31.3 41 31L41.1 30.9C41.2 31 41.2 30.9 41.2 30.9ZM30.1 21.6C30 21.6 29.9 21.6 29.9 21.7V21.6H30.1C30.2 21.6 30.1 21.5 30.1 21.6ZM36.4 37.7C36.3 37.5 35.6 36.1 35.4 35.8C35.5 35.7 35.6 35.7 35.8 35.6C36 35.5 36.2 35.3 36.3 35.2C36.5 35.9 36.8 36.9 37.1 37.5C37.1 37.5 36.4 37.8 36.4 37.7ZM27.1 37.8L27 37.5C27.1 37.4 27.4 37.2 27.5 37C27.7 36.6 27.6 36.2 27.6 36.1V35.9L27.3 36C27.3 35.9 27.4 35.3 27.5 35C27.6 35.1 27.8 35.3 28 35.4C28.1 35.5 28.2 35.5 28.4 35.6C28.2 36.8 27.1 37.8 27.1 37.8ZM30 23.2C29.9 23.2 29.9 23.1 29.9 23.1V22.7C30.2 22.8 30.4 23 30.5 23.4L30 23.2ZM28.4 39.6L27.8 39.2C27.8 39.1 29.7 36.9 29.9 36.6L30.6 36.9C30.3 37.6 29.2 39.8 28.2 40.6L28.4 39.6Z",
      fill: "#997361"
    }), jsx("path", {
      d: "M27.5 39.2L28.2 39.6L28 40.5L27.3 40L27.5 39.2Z",
      fill: "#FFD200"
    }), jsx("path", {
      d: "M24 31.2L23.7 31.3L26.7 38H27L24 31.2ZM27.6 39.1L27.4 39.3L27.5 39.6L27.8 39.5L27.6 39.1Z",
      fill: "#FFD200"
    }), jsx("path", {
      d: "M24.9 36.5L25.3 37.1L24.9 37.2L26 37.7L26.6 37.5L26.5 37.1L24.9 36.5ZM26.9 35.5L26.4 36.2L26.8 37.5L27.4 37L27.5 36.2L27.1 36.4L26.9 35.5ZM25.7 35.4L24.9 35.5L24.2 35.2L24.7 35L24.3 34.5H24.9L25.7 35.4Z",
      fill: "#699635"
    }), jsx("path", {
      d: "M25.9 33.4L26 34L26.3 33.8V34.9L25.7 35.5L25.2 34.6L25.3 34L25.9 33.4ZM23.2 32.3L24 32.4L24.6 33.2H23.8L23.2 32.6L23.6 32.5L23.2 32.3ZM24.6 31.5L24.8 32L25.1 31.7L25.3 32.7L24.9 33.4L24.3 32L24.6 31.5ZM23.1 29.9L23.2 30.6L23.4 30.9L22.8 30.7L23.2 31.4L23.9 31.6L24.2 30.8L23.8 29.9L23.7 30.4L23.1 29.9Z",
      fill: "#699635"
    }), jsx("path", {
      d: "M40.7 30.5L40.8 30.6L40.7 30.7V30.9H40.1V31.6L39.8 32L39.9 32.2L39.8 32.3V32.6L37.7 36.6L37.2 37.1L37.3 37.6L37 37.7L37.1 38.1L37.5 38L37.4 37.7L37.8 37.5L37.9 36.8L40 32.8L40.2 32.6V32.5L40.4 32.4L40.6 31.9L41.1 31.5L40.9 31L41.1 30.9V30.7H41.2V30.1L40.7 30.5ZM36.2 39.5V39.6H36V40.4L36.6 39.9L36.5 39.7L36.6 39.6L36.5 39.4H36.4L36.2 39.5Z",
      fill: "#FFD200"
    }), jsx("path", {
      d: "M36.3 27.3C36.3 27 36.7 26.7 36.7 26.7H26.9C26.9 26.7 27.3 27 27.3 27.3V34.6C27.3 34.8 27.4 34.9 27.5 35C27.6 35.1 27.8 35.3 28 35.4C28.6 35.8 29.7 36.3 30.5 36.6C31.2 36.9 31.5 37 31.8 37.5C32.2 37.1 32.4 36.9 33.1 36.6C33.9 36.2 35 35.8 35.6 35.4C35.8 35.3 36 35.1 36.1 35C36.2 34.9 36.3 34.8 36.3 34.6V27.3Z",
      fill: "#F5D402"
    }), jsx("path", {
      d: "M27.6 31.4V27.3C27.6 27.1 27.5 26.9 27.5 26.9H36.3C36.3 26.9 36.2 27 36.2 27.3V31.4L31.9 32.7L27.6 31.4Z",
      fill: "#ED4C5C"
    }), jsx("path", {
      d: "M36.1 31.4H27.7V34.6C27.7 34.8 27.9 35.1 28.8 35.6C30.4 36.4 31.6 36.7 31.9 37.2C32.3 36.8 33.5 36.4 35 35.6C36 35.1 36.1 34.8 36.1 34.6V31.4Z",
      fill: "#428BC1"
    }), jsx("path", {
      d: "M28.9 33.3L28.1 34.3L28.8 35.4L30.1 35.1L30.2 33.8L28.9 33.3ZM33.5 34.5C33.5 34.9 33.9 35.3 34.3 35.4C34.2 35.3 34.2 35.1 34.2 35C34.1 34.5 34.5 34.1 35.1 34.1H35.4C35.2 33.8 34.8 33.6 34.4 33.6C33.9 33.6 33.5 34 33.5 34.5ZM29.6 29.2L31 30.7L31.4 30.5L31.9 30.7L32.4 30.5L32.8 30.7L34.2 29.2L33.7 27.6L34.8 29.3L33.3 31.2L33.6 32L32.8 32.3L32.7 35.2L33.1 35.6L31.9 36.3L30.7 35.6L31.1 35.2L31 32.3L30.2 32L30.5 31.2L29 29.3L30.1 27.6L29.6 29.2Z",
      fill: "#FFE62E"
    }), jsx("path", {
      d: "M31.8 27.7L32 28.2L32.5 28L32.3 28.5L32.8 28.7L32.3 28.9L32.5 29.4L32 29L31.8 29.5L31.7 29L31.2 29.2L31.4 28.7L30.9 28.5L31.4 28.3L31.2 27.8L31.7 28L31.8 27.7ZM29.7 31.4L28.9 32L28 31.4L28.9 30.9L29.7 31.4ZM35.6 31.4L34.8 32L34 31.4L34.8 30.9L35.6 31.4Z",
      fill: "#FFE62E"
    })]
  });
}
__astro_tag_component__(MoldovaRepublicFlag, "@astrojs/preact");

function GreatBritianFlag({
  className
}) {
  return jsxs("svg", {
    width: "26px",
    height: "26px",
    viewBox: "0 0 26 26",
    fill: "none",
    className,
    xmlns: "http://www.w3.org/2000/svg",
    children: [jsxs("g", {
      clipPath: "url(#clip0_2_6)",
      children: [jsx("path", {
        d: "M8.9375 24.4969V18.8906L4.75313 21.9781C5.93125 23.075 7.35313 23.9281 8.9375 24.4969ZM17.0625 24.4969C18.6469 23.9281 20.0688 23.075 21.2469 21.9781L17.0625 18.85V24.4969ZM1.50313 17.0625C1.625 17.4688 1.7875 17.8344 1.99063 18.2406L3.575 17.0625H1.50313ZM22.425 17.0625L24.0094 18.2406C24.1719 17.875 24.3344 17.4688 24.4969 17.0625H22.425Z",
        fill: "#2A5F9E"
      }), jsx("path", {
        d: "M9.54687 15.4375H1.05624C1.17812 16.0062 1.34062 16.5344 1.50312 17.0625H3.57499L1.99062 18.2406C2.31562 18.9313 2.68124 19.5406 3.12812 20.15L7.31249 17.0625H8.93749V17.875L4.18437 21.3687L4.75312 21.9375L8.93749 18.8906V24.4969C9.46562 24.7 9.99374 24.8219 10.5625 24.9438V15.4375H9.54687ZM24.9437 15.4375H15.4375V24.9438C16.0062 24.8219 16.5344 24.6594 17.0625 24.4969V18.8906L21.2469 21.9375C21.8156 21.4094 22.3031 20.8406 22.7906 20.2312L18.4437 17.0625H21.2062L23.6844 18.8906C23.8062 18.6875 23.9281 18.4438 24.0094 18.2406L22.425 17.0625H24.4969C24.6594 16.5344 24.8219 16.0062 24.9437 15.4375Z",
        fill: "white"
      }), jsx("path", {
        d: "M3.12813 20.15C3.45313 20.5969 3.77813 21.0031 4.14375 21.4094L8.9375 17.9156V17.1031H7.3125L3.12813 20.15ZM18.4844 17.0625L22.8313 20.2312C22.9938 20.0281 23.1156 19.825 23.2781 19.6219C23.3188 19.5812 23.3188 19.5406 23.3594 19.5406C23.4813 19.3375 23.6438 19.0938 23.7656 18.8906L21.2063 17.0625H18.4844Z",
        fill: "#ED4C5C"
      }), jsx("path", {
        d: "M17.0625 1.50312V7.10937L21.2469 4.02187C20.0688 2.925 18.6469 2.07187 17.0625 1.50312ZM8.9375 1.50312C7.35313 2.07187 5.93125 2.925 4.75313 4.02187L8.9375 7.15V1.50312ZM24.4969 8.9375C24.375 8.53125 24.2125 8.16562 24.0094 7.75937L22.425 8.9375H24.4969ZM3.575 8.9375L1.99063 7.75937C1.82813 8.16562 1.66563 8.53125 1.50313 8.9375H3.575Z",
        fill: "#2A5F9E"
      }), jsx("path", {
        d: "M16.4531 10.5625H24.9031C24.7812 9.99375 24.6187 9.46562 24.4562 8.9375H22.3844L23.9687 7.75937C23.6437 7.06875 23.2781 6.45937 22.8312 5.85L18.6875 8.9375H17.0625V8.125L21.8156 4.63125L21.2469 4.0625L17.0625 7.10937V1.50312C16.5344 1.3 16.0062 1.17812 15.4375 1.05625V10.5625H16.4531ZM1.05624 10.5625H10.5625V1.05625C9.99374 1.17812 9.46562 1.34062 8.93749 1.50312V7.10937L4.75312 4.0625C4.18437 4.59062 3.69687 5.15937 3.20937 5.76875L7.55624 8.9375H4.79374L2.31562 7.10937C2.19374 7.3125 2.07187 7.55625 1.99062 7.75937L3.57499 8.9375H1.50312C1.34062 9.46562 1.17812 9.99375 1.05624 10.5625Z",
        fill: "white"
      }), jsx("path", {
        d: "M22.8719 5.85C22.5469 5.40313 22.2219 4.99688 21.8562 4.59063L17.0625 8.08438V8.89688H18.6875L22.8719 5.85ZM7.51562 8.9375L3.20937 5.76875C3.04687 5.97188 2.92499 6.175 2.76249 6.37813C2.72187 6.41875 2.72187 6.45938 2.68124 6.45938C2.55937 6.6625 2.39687 6.90625 2.27499 7.10938L4.75312 8.9375H7.51562Z",
        fill: "#ED4C5C"
      }), jsx("path", {
        d: "M24.9438 10.5625H15.4375V1.05625C14.6656 0.89375 13.8531 0.8125 13 0.8125C12.1469 0.8125 11.3344 0.89375 10.5625 1.05625V10.5625H1.05625C0.89375 11.3344 0.8125 12.1469 0.8125 13C0.8125 13.8531 0.89375 14.6656 1.05625 15.4375H10.5625V24.9438C11.3344 25.1063 12.1469 25.1875 13 25.1875C13.8531 25.1875 14.6656 25.1063 15.4375 24.9438V15.4375H24.9438C25.1063 14.6656 25.1875 13.8531 25.1875 13C25.1875 12.1469 25.1063 11.3344 24.9438 10.5625Z",
        fill: "#ED4C5C"
      })]
    }), jsx("defs", {
      children: jsx("clipPath", {
        id: "clip0_2_6",
        children: jsx("rect", {
          width: "26",
          height: "26",
          fill: "white"
        })
      })
    })]
  });
}
__astro_tag_component__(GreatBritianFlag, "@astrojs/preact");

function RussiaFlag({
  className
}) {
  return jsxs("svg", {
    width: "26px",
    height: "26px",
    viewBox: "0 0 26 26",
    fill: "none",
    className,
    xmlns: "http://www.w3.org/2000/svg",
    children: [jsxs("g", {
      clipPath: "url(#clip0_2_2)",
      children: [jsx("path", {
        d: "M12.9594 0.8125C7.67812 0.8125 3.16875 4.225 1.50312 8.9375H24.4969C22.7906 4.225 18.2812 0.8125 12.9594 0.8125Z",
        fill: "#F9F9F9"
      }), jsx("path", {
        d: "M12.9594 25.1875C18.2812 25.1875 22.7906 21.775 24.4562 17.0625H1.50312C3.16875 21.8156 7.67812 25.1875 12.9594 25.1875Z",
        fill: "#ED4C5C"
      }), jsx("path", {
        d: "M1.50313 8.9375C1.05625 10.1969 0.8125 11.5781 0.8125 13C0.8125 14.4219 1.05625 15.8031 1.50313 17.0625H24.4969C24.9437 15.8031 25.1875 14.4219 25.1875 13C25.1875 11.5781 24.9437 10.1969 24.4969 8.9375H1.50313Z",
        fill: "#428BC1"
      })]
    }), jsx("defs", {
      children: jsx("clipPath", {
        id: "clip0_2_2",
        children: jsx("rect", {
          width: "26",
          height: "26",
          fill: "white"
        })
      })
    })]
  });
}
__astro_tag_component__(RussiaFlag, "@astrojs/preact");

function LineIcon({
  className
}) {
  return jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    viewBox: "0 0 800 800",
    className,
    children: [jsx("g", {
      strokeWidth: "12",
      stroke: "rgb(49, 49, 49)",
      fill: "none",
      strokeLinecap: "square",
      strokeLinejoin: "round",
      strokeDasharray: "30 50",
      transform: "matrix(-0.7071067811865475,0.7071067811865476,-0.7071067811865476,-0.7071067811865475,964.685424949238,399.99999999999994)",
      children: jsx("path", {
        d: "M127.5 127.5Q380.5 332.5 672.5 672.5 ",
        markerEnd: "url(#SvgjsMarker3083)"
      })
    }), jsx("defs", {
      children: jsx("marker", {
        markerWidth: "1",
        markerHeight: "1",
        refX: "0.5",
        refY: "0.5",
        viewBox: "0 0 1 1",
        orient: "auto",
        id: "SvgjsMarker3083",
        children: jsx("polygon", {
          points: "0.2,1 0,0.5 0.2,0 1,0.5",
          fill: "rgb(49, 49, 49)"
        })
      })
    })]
  });
}
__astro_tag_component__(LineIcon, "@astrojs/preact");

function BigLine({
  className
}) {
  return jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    viewBox: "0 0 800 800",
    className,
    children: [jsx("g", {
      style: {
        stroke: "var(--color-darkgray)"
      },
      strokeWidth: "12",
      fill: "none",
      strokeLinecap: "square",
      strokeLinejoin: "round",
      strokeDasharray: "30 50",
      transform: "rotate(135, 400, 400)",
      children: jsx("path", {
        d: "M66 66Q639 199 734 734 ",
        markerEnd: "url(#SvgjsMarker1666)"
      })
    }), jsx("defs", {
      children: jsx("marker", {
        markerWidth: "1",
        markerHeight: "1",
        refX: "0.5",
        refY: "0.5",
        viewBox: "0 0 1 1",
        orient: "auto",
        id: "SvgjsMarker1666",
        children: jsx("polygon", {
          points: "0,1 0.3333333333333333,0.5 0,0 1,0.5",
          fill: "rgb(49, 49, 49)"
        })
      })
    })]
  });
}
__astro_tag_component__(BigLine, "@astrojs/preact");

function EyeIcon({
  className
}) {
  return jsx("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: classNames("", {}, [className]),
    children: jsx("path", {
      d: "M12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9ZM12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z",
      fill: "black"
    })
  });
}
__astro_tag_component__(EyeIcon, "@astrojs/preact");

function PauseIcon({
  className
}) {
  return jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: classNames("", {}, [className]),
    children: jsx("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    })
  });
}
__astro_tag_component__(PauseIcon, "@astrojs/preact");

function PlayIcon({
  className
}) {
  return jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: classNames("", {}, [className]),
    children: [jsx("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    }), jsx("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
    })]
  });
}
__astro_tag_component__(PlayIcon, "@astrojs/preact");

function AntiClockwiseIcon({
  className
}) {
  return jsx("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    children: jsx("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M13.032 0.233601L14.1648 1.3664L12.3264 3.2032C15.0259 3.28756 17.5866 4.41892 19.4668 6.35787C21.3469 8.29681 22.3988 10.8912 22.4 13.592C22.3987 16.3493 21.3024 18.9932 19.3521 20.9422C17.4018 22.8913 14.7573 23.986 12 23.9856C9.24273 23.986 6.59817 22.8913 4.64788 20.9422C2.6976 18.9932 1.60127 16.3493 1.6 13.592V12.792H3.2V13.592C3.20127 15.9249 4.12902 18.1618 5.77925 19.8109C7.42948 21.4599 9.66707 22.386 12 22.3856C14.3328 22.3856 16.5701 21.4593 18.2203 19.8104C19.8704 18.1615 20.7983 15.9248 20.8 13.592C20.7988 11.3175 19.9168 9.13189 18.339 7.4936C16.7613 5.85531 14.6104 4.89166 12.3376 4.8048L14.1648 6.6288L13.032 7.7616L9.2688 3.9984L13.032 0.233601Z",
      style: {
        fill: "var(--color-accent)"
      }
    })
  });
}
__astro_tag_component__(AntiClockwiseIcon, "@astrojs/preact");

function Languages({
  className,
  language,
  defaultLanguage
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);
  function onMouseEnterHandler() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }
  function mouseLeaveHandler() {
    const delay = window.innerWidth < 769 ? 0 : 400;
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, delay);
  }
  const LanguageFlag = (() => {
    let languageFlag;
    switch (language) {
      case "ro":
        languageFlag = jsx(MoldovaRepublicFlag, {});
        break;
      case "ru":
        languageFlag = jsx(RussiaFlag, {});
        break;
      case "en":
        languageFlag = jsx(GreatBritianFlag, {});
        break;
      default:
        languageFlag = jsx(GreatBritianFlag, {});
        break;
    }
    return languageFlag;
  })();
  function localizedLink(lang) {
    const url = window.location.href;
    const to = "/" + url.split(".").pop()?.split("/").pop();
    return lang === defaultLanguage ? to : "/" + lang + to;
  }
  return jsx("div", {
    onClick: () => setDropdownOpen((prev) => !prev),
    onMouseEnter: onMouseEnterHandler,
    onMouseLeave: mouseLeaveHandler,
    className: classNames(styles$3.languages, {}, [className]),
    children: jsxs("div", {
      className: styles$3.dropdownContainer,
      children: [LanguageFlag, dropdownOpen && jsxs("div", {
        className: styles$3.dropdown,
        children: [jsxs("a", {
          href: localizedLink("ro"),
          className: styles$3.language,
          children: [jsx(MoldovaRepublicFlag, {}), " RO"]
        }), jsxs("a", {
          href: localizedLink("en"),
          className: styles$3.language,
          children: [jsx(GreatBritianFlag, {}), " EN"]
        }), jsxs("a", {
          href: localizedLink("ru"),
          className: styles$3.language,
          children: [jsx(RussiaFlag, {}), " RU"]
        })]
      })]
    })
  });
}
__astro_tag_component__(Languages, "@astrojs/preact");

function Navbar({
  className,
  language,
  defaultLanguage,
  data,
  socialsData
}) {
  return jsxs("div", {
    className: classNames(styles$4.container, {}, [className]),
    children: [jsx(NavigationList, {
      className: styles$4.navList,
      data
    }), jsx(SocialIcons, {
      className: styles$4.socialIcons,
      data: socialsData
    }), jsx(Languages, {
      className: styles$4.languages,
      defaultLanguage,
      language
    })]
  });
}
__astro_tag_component__(Navbar, "@astrojs/preact");

function disableScroll(isClosed) {
  document.body.style.overflowY = isClosed ? "hidden" : "auto";
}
__astro_tag_component__(disableScroll, "@astrojs/preact");

function Burger({
  className,
  language,
  defaultLanguage,
  data,
  socialsData
}) {
  const [isBurgerVisible, setIsBurgerVisible] = useState(false);
  function toggleBurger() {
    setIsBurgerVisible((prev) => !prev);
  }
  useEffect(() => {
    disableScroll(isBurgerVisible);
  }, [isBurgerVisible]);
  return jsxs(Fragment, {
    children: [jsx(Languages, {
      language,
      defaultLanguage,
      className: styles$5.languages
    }), jsx(BurgerIcon, {
      className,
      onClick: toggleBurger,
      isOpen: isBurgerVisible
    }), jsx(BurgerModal, {
      data,
      isOpen: isBurgerVisible,
      onClose: toggleBurger,
      socialsData
    })]
  });
}
function BurgerIcon(props) {
  const {
    className,
    onClick,
    isOpen
  } = props;
  return jsx("div", {
    className: classNames(styles$5.icon, {}, [className]),
    children: jsx("div", {
      "aria-label": "toggle navigation",
      onClick,
      className: classNames(styles$5.container, {
        [styles$5.burgerOpen]: isOpen
      }, [className]),
      children: jsx("span", {
        className: styles$5.hamburger
      })
    })
  });
}
function BurgerModal({
  isOpen,
  onClose,
  data,
  socialsData
}) {
  return jsxs(Fragment, {
    children: [jsx("div", {
      className: classNames(styles$5.overlay, {
        [styles$5.navOpen]: isOpen
      }),
      onClick: onClose
    }), jsx("div", {
      className: classNames(styles$5.wrapper, {
        [styles$5.navOpen]: isOpen
      }),
      children: jsxs("div", {
        className: styles$5.container,
        children: [jsx(NavigationList, {
          data,
          closeClickHandler: onClose
        }), jsx(SocialIcons, {
          data: socialsData
        })]
      })
    })]
  });
}
__astro_tag_component__(Burger, "@astrojs/preact");

function Header({
  language,
  data,
  children,
  defaultLanguage,
  socialsData
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollHandler = () => {
    const boolean = window.pageYOffset > 15;
    setIsScrolled(boolean);
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);
  return jsxs(Fragment, {
    children: [jsx(Burger, {
      language,
      defaultLanguage,
      className: styles$6.burger,
      data,
      socialsData
    }), jsx("div", {
      className: classNames(styles$6.wrapper, {
        [styles$6.blur]: isScrolled
      }),
      children: jsxs("div", {
        className: styles$6.container,
        children: [children, jsx(Navbar, {
          className: styles$6.navbar,
          language,
          defaultLanguage,
          data,
          socialsData
        })]
      })
    })]
  });
}
__astro_tag_component__(Header, "@astrojs/preact");

function Typography(props) {
  const {
    color = "base",
    tag = "h4",
    size = "m",
    children,
    className,
    weight = "four"
  } = props;
  const mods = {
    [styles$7.xs]: "xs" === size,
    [styles$7.s]: "s" === size,
    [styles$7.m]: "m" === size,
    [styles$7.l]: "l" === size,
    [styles$7.xl]: "xl" === size,
    [styles$7.xxl]: "xxl" === size,
    [styles$7.xxxl]: "xxxl" === size,
    [styles$7.xxxxl]: "xxxxl" === size,
    [styles$7.color_base]: "base" === color,
    [styles$7.color_darkgray]: "darkgray" === color,
    [styles$7.color_lightgray]: "lightgray" === color,
    [styles$7.color_accent]: "accent" === color,
    [styles$7.color_error]: "error" === color,
    [styles$7.four]: weight === "four",
    [styles$7.five]: weight === "five",
    [styles$7.six]: weight === "six",
    [styles$7.seven]: weight === "seven"
  };
  switch (true) {
    case "h1" === tag:
      return jsx("h1", {
        className: classNames(styles$7.typography, mods, [className]),
        children
      });
    case "h2" === tag:
      return jsx("h2", {
        className: classNames(styles$7.typography, mods, [className]),
        children
      });
    case "h3" === tag:
      return jsx("h3", {
        className: classNames(styles$7.typography, mods, [className]),
        children
      });
    case "h4" === tag:
      return jsx("h4", {
        className: classNames(styles$7.typography, mods, [className]),
        children
      });
    case "h5" === tag:
      return jsx("h5", {
        className: classNames(styles$7.typography, mods, [className]),
        children
      });
    case "h6" === tag:
      return jsx("h6", {
        className: classNames(styles$7.typography, mods, [className]),
        children
      });
    case "p" === tag:
      return jsx("p", {
        className: classNames(styles$7.typography, mods, [className]),
        children
      });
    default:
      return null;
  }
}
__astro_tag_component__(Typography, "@astrojs/preact");

function Footer({
  data,
  children,
  language,
  addressData,
  socialsData
}) {
  const footerList = reformatAndSortObjectValuesToArray(data);
  const {
    location,
    mail,
    phone
  } = addressData;
  return jsxs("footer", {
    className: styles$8.container,
    children: [jsx("div", {
      className: styles$8.logoContainer,
      children
    }), jsxs("div", {
      className: styles$8.locationContainer,
      children: [jsx(Typography, {
        className: styles$8.header,
        tag: "h3",
        size: "xxl",
        children: footerList[0]
      }), jsx("a", {
        href: "https://yandex.ru/maps/org/leovink_tattoo_studio/184496310101/?utm_medium=mapframe&utm_source=maps",
        className: styles$8.text,
        children: location[language]
      })]
    }), jsxs("div", {
      className: styles$8.contactsContainer,
      children: [jsx(Typography, {
        className: styles$8.header,
        tag: "h3",
        size: "xxl",
        children: footerList[1]
      }), [...phone, ...mail].map((item) => jsx(Typography, {
        className: styles$8.text,
        tag: "p",
        size: "m",
        color: "lightgray",
        children: item
      }))]
    }), jsxs("div", {
      className: styles$8.followContainer,
      children: [jsx(Typography, {
        className: styles$8.header,
        tag: "h3",
        size: "xxl",
        children: footerList[2]
      }), jsx(SocialIcons, {
        className: styles$8.socials,
        data: socialsData
      })]
    })]
  });
}
__astro_tag_component__(Footer, "@astrojs/preact");

const logo = "/_astro/logo.b05f7e21.png";

function LogoLink({
  language,
  defaultLanguage
}) {
  function getLogoLink(language2) {
    if (language2 === defaultLanguage)
      return "/";
    return "/" + language2 + "/";
  }
  return jsx("a", {
    href: getLogoLink(language),
    className: styles$9.logoContainer,
    children: jsx("img", {
      src: logo,
      className: styles$9.logo,
      alt: ""
    })
  });
}
__astro_tag_component__(LogoLink, "@astrojs/preact");

function getLangFromUrl(url) {
  const [, lang] = url.pathname.split("/");
  if (lang === "ru")
    return "ru";
  if (lang === "ro")
    return "ro";
  return "en";
}

const $$Astro$3 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Layout;
  const defaultLanguage = "en";
  const language = getLangFromUrl(Astro2.url);
  const globalData = await fetchGlobalData();
  const { layoutData, addressData, socialsData } = globalData;
  const { image } = Astro2.props;
  return renderTemplate`<html${addAttribute(language, "lang")}>
    <head>
        <meta charset="UTF-8">
        <meta name="description" content="Astro description">
        <meta name="viewport" content="width=device-width">
        <link rel="icon" type="image/x-icon" href="/favicon.ico">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap" rel="stylesheet">
        <meta name="generator"${addAttribute(Astro2.generator, "content")}>
        <title>Leovink Tattoo</title>
    ${renderHead($$result)}</head>
    <body>
        ${image && renderTemplate`<div class="layout__dungeon-background"${addAttribute({ backgroundImage: `url(${image})` }, "style")}></div>`}
        ${renderComponent($$result, "Header", Header, { "client:load": true, "language": language, "defaultLanguage": defaultLanguage, "data": layoutData.navList[language], "socialsData": socialsData, "client:component-hydration": "load", "client:component-path": "widgets/Header", "client:component-export": "Header" }, { "default": ($$result2) => renderTemplate`
            ${renderComponent($$result2, "LogoLink", LogoLink, { "language": language, "defaultLanguage": defaultLanguage })}
        ` })}
        ${renderSlot($$result, $$slots["default"])}
        ${renderComponent($$result, "Footer", Footer, { "data": layoutData.footerList[language], "addressData": addressData, "language": language, "socialsData": socialsData }, { "default": ($$result2) => renderTemplate`  
            ${renderComponent($$result2, "LogoLink", LogoLink, { "language": language, "defaultLanguage": defaultLanguage })}
        ` })}
    </body></html>`;
}, "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/layouts/Layout.astro");

function Section(props) {
  const {
    children,
    wrapperClassName,
    containerClassName,
    title
  } = props;
  return jsx("section", {
    className: classNames(styles$a.wrapper, {}, [wrapperClassName]),
    children: jsxs("div", {
      className: classNames(styles$a.container, {}, [containerClassName]),
      children: [!!title && jsx(Typography, {
        className: styles$a.title,
        tag: "h1",
        children: title
      }), children]
    })
  });
}
__astro_tag_component__(Section, "@astrojs/preact");

const Portal = (props) => {
  const {
    children,
    element = document.body
  } = props;
  return createPortal(children, element);
};
__astro_tag_component__(Portal, "@astrojs/preact");

const MODAL_ANIMATION_DELAY = 300;

const Modal = (props) => {
  const {
    className,
    contentClassName,
    children,
    isOpen,
    onClose,
    lazy
  } = props;
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (isOpen && !isMounted) {
      setIsOpening(true);
      setIsMounted(true);
      setTimeout(() => {
        setIsOpening(false);
      }, MODAL_ANIMATION_DELAY);
    } else if (!isOpen && isMounted) {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setIsMounted(false);
      }, MODAL_ANIMATION_DELAY);
    }
    disableScroll(isOpen);
  }, [isOpen, isMounted]);
  const mods = {
    [cls.isOpen]: isMounted,
    [cls.isClosing]: isClosing,
    [cls.isOpening]: isOpening
  };
  if (!isMounted)
    return null;
  return jsx(Portal, {
    children: jsx("div", {
      className: classNames(cls.Modal, mods, [className]),
      children: jsx("div", {
        className: cls.overlay,
        onClick: () => onClose?.(),
        children: jsx("div", {
          className: classNames(cls.content, {}, [contentClassName]),
          onClick: (e) => e.stopPropagation(),
          children
        })
      })
    })
  });
};
__astro_tag_component__(Modal, "@astrojs/preact");

function ModalGallery({
  data,
  isOpen,
  onClose,
  language
}) {
  const swiperRef = useRef();
  return jsxs(Modal, {
    isOpen,
    onClose,
    contentClassName: styles$b.container,
    children: [jsx("div", {
      className: styles$b.cross,
      onClick: onClose,
      children: jsx(PlusIcon, {})
    }), jsx("div", {
      className: styles$b.prev,
      onClick: () => swiperRef.current?.slidePrev(),
      children: jsx(ChevronDownIcon, {})
    }), jsx("div", {
      className: styles$b.next,
      onClick: () => swiperRef.current?.slideNext(),
      children: jsx(ChevronDownIcon, {})
    }), jsx(Swiper, {
      slidesPerView: 1,
      loop: true,
      modules: [Navigation],
      onSwiper: (swiper) => swiperRef.current = swiper,
      className: classNames(styles$b.swiper, {}, ["pagination"]),
      children: data.map((item, index) => {
        const {
          img,
          alt
        } = item;
        return jsx(SwiperSlide, {
          className: styles$b.slide,
          children: jsxs("div", {
            className: styles$b.slideContainer,
            children: [jsx("img", {
              src: img,
              className: styles$b.img,
              alt: alt[language]
            }), jsx("div", {
              className: styles$b.descriptionContainer,
              children: jsx(Typography, {
                tag: "p",
                className: styles$b.description,
                children: alt[language]
              })
            })]
          })
        }, index);
      })
    })]
  });
}
__astro_tag_component__(ModalGallery, "@astrojs/preact");

function GalleryGrid({
  data,
  onClick,
  maxHeight = "auto",
  language
}) {
  const formatedImages = data;
  return jsx("div", {
    className: classNames(styles$c.container, {
      [styles$c.withGradient]: maxHeight !== "auto"
    }),
    style: {
      maxHeight
    },
    children: jsxs("div", {
      className: styles$c.gridContainer,
      children: [formatedImages.map((item, index) => {
        const {
          img,
          alt
        } = item;
        return jsxs("div", {
          className: styles$c.item,
          onClick: () => onClick?.(index),
          children: [jsx("img", {
            src: img,
            alt: alt[language]
          }), jsx(EyeIcon, {
            className: styles$c.eye
          })]
        }, index);
      }), jsx("span", {
        className: `${styles$c.item} ${styles$c.break}`
      }), jsx("span", {
        className: `${styles$c.item} ${styles$c.break}`
      }), jsx("span", {
        className: `${styles$c.item} ${styles$c.break}`
      }), jsx("span", {
        className: `${styles$c.item} ${styles$c.break}`
      })]
    })
  });
}
__astro_tag_component__(GalleryGrid, "@astrojs/preact");

function Button(props) {
  const {
    children,
    className,
    ...otherProps
  } = props;
  return jsx("button", {
    className: classNames(styles$d.btn, {}, [className]),
    ...otherProps,
    children
  });
}
__astro_tag_component__(Button, "@astrojs/preact");

function Input(props) {
  const {
    type = "text",
    label,
    isRequired = false,
    className,
    error,
    value,
    id,
    onChange,
    ...otherProps
  } = props;
  const containerClassName = classNames(styles$e.container, {
    [styles$e.incorrect]: error
  }, [className]);
  function changeHandler(e) {
    e.preventDefault();
    const target = e.target;
    onChange?.(target.value);
  }
  return jsxs("div", {
    className: containerClassName,
    "data-testid": "InputContainer",
    children: [!!label && jsxs("label", {
      htmlFor: id,
      className: styles$e.label,
      "data-testid": "InputLabel",
      children: [label, isRequired && jsx("span", {
        className: styles$e.required,
        children: "*"
      })]
    }), jsx("input", {
      id,
      onInput: changeHandler,
      value,
      type,
      className: styles$e.input,
      ...otherProps,
      "data-testid": "Input"
    }), !!error && jsx("p", {
      className: styles$e.error,
      children: error
    })]
  });
}
__astro_tag_component__(Input, "@astrojs/preact");

const NAME_REG_EX = /^[a-zа-яё\s]+$/iu;
const PHONE_REG_EX = /^[0-9+() -]+$/;

const initialFormData = { name: "", phone: "" };

function FormStatus({
  icon,
  text
}) {
  return jsxs("div", {
    className: styles$f.container,
    children: [jsx("div", {
      className: styles$f.iconContainer,
      children: icon
    }), jsx("div", {
      className: styles$f.contentContainer,
      children: text
    })]
  });
}
__astro_tag_component__(FormStatus, "@astrojs/preact");

function AnimatedLoadingIcon({
  className
}) {
  return jsx(AiOutlineLoading3Quarters, {
    className: `${styles$g.icon} ${className}`
  });
}
__astro_tag_component__(AnimatedLoadingIcon, "@astrojs/preact");

function Form({
  isVertical,
  className,
  data,
  title,
  cta
}) {
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  function checkInputsValid(formData2) {
    const {
      name,
      phone
    } = formData2;
    if (!NAME_REG_EX.test(name)) {
      setFormErrors((prev) => ({
        ...prev,
        name: data.validName
      }));
      nameRef.current?.scrollIntoView();
      return false;
    }
    if (!PHONE_REG_EX.test(phone)) {
      setFormErrors((prev) => ({
        ...prev,
        phone: data.validPhone
      }));
      phoneRef.current?.scrollIntoView();
      return false;
    }
    return true;
  }
  function sendEmail() {
    setIsLoading(true);
    emailjs.sendForm("service_mk9oekz", "template_al6asgr", formRef.current || "", "nNYNyaD6eJNXQQHa_").then(() => {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3e3);
      setFormData(initialFormData);
      setFormErrors(initialFormData);
    }, () => {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3e3);
    }).finally(() => {
      setIsLoading(false);
    });
  }
  const submitHandler = useCallback((e) => {
    e.preventDefault();
    if (!checkInputsValid(formData))
      return;
    sendEmail();
  }, [formData]);
  const content = useMemo(() => {
    switch (true) {
      case isLoading:
        return jsx(FormStatus, {
          icon: jsx(AnimatedLoadingIcon, {
            className: styles$h.loadingIcon
          }),
          text: data.loading
        });
      case isError:
        return jsx(FormStatus, {
          icon: jsx(BiErrorCircle, {
            className: styles$h.failIcon
          }),
          text: data.error
        });
      case isSuccess:
        return jsx(FormStatus, {
          icon: jsx(AiOutlineCheckCircle, {
            className: styles$h.successIcon
          }),
          text: data.success
        });
      default:
        return jsx(Fragment, {
          children: jsxs("div", {
            className: styles$h.formContent,
            children: [jsx(Input, {
              placeholder: data.name,
              className: styles$h.input,
              value: formData.name,
              error: formErrors.name,
              name: "name",
              onChange: (name) => {
                console.log("fired on Change");
                setFormData((prev) => ({
                  ...prev,
                  name
                }));
                setFormErrors((prev) => ({
                  ...prev,
                  name: ""
                }));
              }
            }), jsx(Input, {
              placeholder: data.phone,
              className: styles$h.input,
              value: formData.phone,
              name: "phone",
              error: formErrors.phone,
              onChange: (phone) => {
                setFormData((prev) => ({
                  ...prev,
                  phone
                }));
                setFormErrors((prev) => ({
                  ...prev,
                  phone: ""
                }));
              }
            }), jsxs(Button, {
              className: styles$h.btn,
              type: "submit",
              children: [cta, " ", jsx(ArrowDownIcon, {
                className: styles$h.icon
              })]
            })]
          })
        });
    }
  }, [formData, formErrors, isLoading, isError, isSuccess, submitHandler]);
  return jsxs("form", {
    id: "formSection",
    className: classNames(styles$h.form, {
      [styles$h.vertical]: isVertical
    }, [className]),
    ref: formRef,
    onSubmit: submitHandler,
    children: [jsx(Typography, {
      tag: "h2",
      size: "xxl",
      className: styles$h.title,
      children: title
    }), content]
  });
}
__astro_tag_component__(Form, "@astrojs/preact");

function PageWrapper({
  children,
  title,
  main
}) {
  return jsxs("div", {
    className: styles$i.wrapper,
    children: [jsxs("div", {
      className: styles$i.header,
      children: [jsx(Typography, {
        tag: "h1",
        size: "xxxxl",
        color: "darkgray",
        className: styles$i.title,
        children: title
      }), jsxs(AppLink, {
        className: styles$i.back,
        to: "/",
        children: [jsx(ArrowLeftIcon, {}), " ", main]
      })]
    }), jsx("div", {
      className: styles$i.content,
      children
    })]
  });
}
__astro_tag_component__(PageWrapper, "@astrojs/preact");

const cave = "/_astro/dungeon.eb6261a5.webp";

function ArtistPage({
  formData,
  formTitle,
  cta,
  data,
  imagesData,
  language
}) {
  const {
    name,
    img,
    specialization,
    description
  } = data;
  const galleryData = imagesData;
  const [modalData, setModalData] = useState(galleryData);
  const [isOpen, setIsOpen] = useState(false);
  function clickHandler(index) {
    const newModalData = [...galleryData.slice(index), ...galleryData.slice(0, index)];
    setIsOpen(true);
    setModalData(newModalData);
  }
  return jsxs(Fragment, {
    children: [jsxs(Section, {
      containerClassName: styles$j.container,
      children: [jsxs("div", {
        className: styles$j.card,
        children: [jsx("div", {
          className: styles$j.left,
          children: jsx("img", {
            src: img,
            alt: ""
          })
        }), jsxs("div", {
          className: styles$j.right,
          children: [jsx(Typography, {
            tag: "h2",
            size: "xxxl",
            className: styles$j.name,
            children: name
          }), jsx(Typography, {
            tag: "p",
            color: "lightgray",
            className: styles$j.specialization,
            children: specialization
          }), jsx(Typography, {
            tag: "p",
            color: "lightgray",
            children: description
          })]
        })]
      }), jsx(Form, {
        isVertical: true,
        data: formData,
        title: formTitle,
        cta
      })]
    }), jsxs(Section, {
      title: "Gallery",
      children: [jsx(GalleryGrid, {
        data: galleryData,
        onClick: clickHandler,
        language
      }), jsx(ModalGallery, {
        data: modalData,
        isOpen,
        onClose: () => setIsOpen(false),
        language
      })]
    })]
  });
}
__astro_tag_component__(ArtistPage, "@astrojs/preact");

const $$Astro$2 = createAstro();
const $$$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$$2;
  const language = getLangFromUrl(Astro2.url);
  const { artistSlug } = Astro2.params;
  const pages = await fetchSectionData(language, "artists");
  const artist = pages.find((page) => page.slug === artistSlug);
  if (!artist)
    return Astro2.redirect("/404");
  const imagesData = await fetchImagesData();
  const globalData = await fetchGlobalData();
  const { sectionNames, buttons, formData, layoutData } = globalData;
  const { cta } = buttons[language];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "image": cave }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "PageWrapper", PageWrapper, { "title": sectionNames[language].artists, "main": layoutData.navList[language][0].text }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "ArtistPage", ArtistPage, { "client:load": true, "formTitle": sectionNames[language].form, "cta": cta, "formData": formData[language], "data": artist, "imagesData": imagesData, "language": language, "client:component-hydration": "load", "client:component-path": "pageComponents/ArtistPage/ArtistPage", "client:component-export": "ArtistPage" })}
    ` })}
` })}`;
}, "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ro/[...artistSlug].astro");

const $$file$2 = "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ro/[...artistSlug].astro";
const $$url$2 = "/ro/[...artistSlug]";

const ____artistSlug_$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$$2,
    file: $$file$2,
    url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro();
const $$$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$$1;
  const language = getLangFromUrl(Astro2.url);
  const { artistSlug } = Astro2.params;
  const pages = await fetchSectionData(language, "artists");
  const artist = pages.find((page) => page.slug === artistSlug);
  if (!artist)
    return Astro2.redirect("/404");
  const imagesData = await fetchImagesData();
  const globalData = await fetchGlobalData();
  const { sectionNames, buttons, formData, layoutData } = globalData;
  const { cta } = buttons[language];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "image": cave }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "PageWrapper", PageWrapper, { "title": sectionNames[language].artists, "main": layoutData.navList[language][0].text }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "ArtistPage", ArtistPage, { "client:load": true, "formTitle": sectionNames[language].form, "cta": cta, "formData": formData[language], "data": artist, "imagesData": imagesData, "language": language, "client:component-hydration": "load", "client:component-path": "pageComponents/ArtistPage/ArtistPage", "client:component-export": "ArtistPage" })}
    ` })}
` })}`;
}, "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ru/[...artistSlug].astro");

const $$file$1 = "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ru/[...artistSlug].astro";
const $$url$1 = "/ru/[...artistSlug]";

const ____artistSlug_$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$$1,
    file: $$file$1,
    url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const language = getLangFromUrl(Astro2.url);
  const { artistSlug } = Astro2.params;
  const pages = await fetchSectionData(language, "artists");
  const artist = pages.find((page) => page.slug === artistSlug);
  if (!artist)
    return Astro2.redirect("/404");
  const imagesData = await fetchImagesData();
  const globalData = await fetchGlobalData();
  const { sectionNames, buttons, formData, layoutData } = globalData;
  const { cta } = buttons[language];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "image": cave }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "PageWrapper", PageWrapper, { "title": sectionNames[language].artists, "main": layoutData.navList[language][0].text }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "ArtistPage", ArtistPage, { "client:load": true, "formTitle": sectionNames[language].form, "cta": cta, "formData": formData[language], "data": artist, "imagesData": imagesData.filter((item) => item.filters.artists === artist.key), "language": language, "client:component-hydration": "load", "client:component-path": "pageComponents/ArtistPage/ArtistPage", "client:component-export": "ArtistPage" })}
    ` })}
` })}`;
}, "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/[...artistSlug].astro");

const $$file = "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/[...artistSlug].astro";
const $$url = "/[...artistSlug]";

const ____artistSlug_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, AppLink as A, Button as B, ChevronDownIcon as C, Form as F, GalleryGrid as G, ModalGallery as M, PageWrapper as P, Section as S, Typography as T, ____artistSlug_$2 as _, PlusIcon as a, classNames as b, cave as c, fetchSectionData as d, ArrowDownIcon as e, fetchGlobalData as f, getLangFromUrl as g, Modal as h, fetchImagesData as i, AntiClockwiseIcon as j, ____artistSlug_$1 as k, ____artistSlug_ as l };
