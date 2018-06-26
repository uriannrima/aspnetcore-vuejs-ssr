<template>
  <div id="app">
    <h1>Application</h1>
    <ul>
      <li>
        <router-link to="/"
                     exact>Home</router-link>
      </li>
      <li>
        <router-link to="/item/1">Item 1</router-link>
      </li>
      <li>
        <router-link to="/foo">Foo</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
