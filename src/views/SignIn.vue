<template>
  <div class="sign-container">
    <div class="sign">
      <header class="sign__header">
        <div class="sign__header-logo"></div>
        <p class="sign__header-title"><span>登入</span><span>Alphitter</span></p>
      </header>
      <label class="sign__form-row">
        <p class="sign__form-title"></p>
        <input type="email" class="sign__form-input">
        <p class="sign__form-error">
          <span class="error"></span>
          <span class="limit"></span>
        </p>
      </label>
      <label class="sign__form-row">
        <p class="sign__form-title"></p>
        <input type="password" class="sign__form-input">
        <p class="sign__form-error">
          <span class="error"></span>
          <span class="limit"></span>
        </p>
      </label>
      <button class="sign__submit" type="submit">登入</button>
      <div class="sign__btns">
        <router-link to="" class="sign__link"></router-link>
        <router-link to="" class="sign__link"></router-link>
      </div>
    </div>
  </div>
</template>
