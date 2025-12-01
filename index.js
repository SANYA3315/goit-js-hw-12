import{a as L,S as b,i as p}from"./assets/vendor-DvfmeZXB.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();const w="53367958-e4d72e9b7abbbffbba381cf2e",B="https://pixabay.com/api/",h=15,A=L.create({baseURL:B,timeout:1e4});async function S(e,t=1){try{return(await A.get("/",{params:{key:w,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:h,page:t}})).data}catch(a){throw a}}const s={gallery:document.querySelector(".js-gallery"),loader:document.getElementById("loader"),loadMoreBtn:document.getElementById("load-more")},m=new b(".js-gallery a",{captionsData:"alt",captionDelay:250});function E({webformatURL:e,largeImageURL:t,tags:a,likes:i,views:r,comments:o,downloads:l}){return`<li class="gallery-item">
    <a href="${t}" class="gallery-link">
      <img src="${e}" alt="${a}" loading="lazy" />
    </a>
    <div class="gallery-descr">
      <div class="gallery-descr-item">
        <p class="gallery-descr-title">Likes</p>
        <p class="gallery-descr-value">${i}</p>
      </div>
      <div class="gallery-descr-item">
        <p class="gallery-descr-title">Views</p>
        <p class="gallery-descr-value">${r}</p>
      </div>
      <div class="gallery-descr-item">
        <p class="gallery-descr-title">Comments</p>
        <p class="gallery-descr-value">${o}</p>
      </div>
      <div class="gallery-descr-item">
        <p class="gallery-descr-title">Downloads</p>
        <p class="gallery-descr-value">${l}</p>
      </div>
    </div>
  </li>`}function M(e){if(!Array.isArray(e)||e.length===0)return;const t=e.map(E).join("");s.gallery.insertAdjacentHTML("beforeend",t),m.refresh()}function P(){s.gallery.innerHTML="",m.refresh()}function R(){s.loader.classList.remove("is-hidden")}function q(){s.loader.classList.add("is-hidden")}function I(){s.loadMoreBtn.classList.remove("is-hidden")}function c(){s.loadMoreBtn.classList.add("is-hidden")}const $=s.gallery,O=s.loadMoreBtn,f=document.getElementById("search-form"),x=f.querySelector('input[name="search-text"]');let d="",n=1,u=0;f.addEventListener("submit",_);O.addEventListener("click",j);function y(e){p.info({title:"",message:e,position:"topRight"})}function g(e){p.error({title:"Error",message:e,position:"topRight"})}async function _(e){e.preventDefault();const t=x.value.trim();if(!t){y("Please enter a search query.");return}t!==d&&(d=t,n=1,u=0,P(),c()),await v(),f.reset()}async function j(){await v()}async function v(){try{R();const e=await S(d,n);if(!e||!Array.isArray(e.hits)){g("Немає відповіді від сервера.");return}const{hits:t,totalHits:a}=e;if(n===1&&t.length===0){c(),y("Sorry, there are no images matching your search query. Please try again!");return}M(t),u=a,(n-1)*h+t.length<u?I():(c(),y("We're sorry, but you've reached the end of search results.")),n>1&&C(),n+=1}catch(e){g("Something went wrong. Please try again later."),console.error(e)}finally{q()}}function C(){const e=$.querySelector(".gallery-item");if(!e)return;const{height:t}=e.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
