import { mount } from "@vue/test-utils";
import Home from "../views/Home.vue";
import { createRouter, createWebHistory } from "vue-router";
import Button from "primevue/button";
import { describe, it, expect, beforeEach, vi } from "vitest";

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/pokemon-list", name: "pokemon-list", component: {} }],
});

describe("Home.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Home, {
      global: {
        components: { Button },
        mocks: {
          $router: router,
        },
      },
    });
  });

  it("renders the component", () => {
    expect(wrapper.find("p.text-lg").exists()).toBe(true);
    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("navigates to PokemonList when button is clicked", async () => {
    const pushSpy = vi.spyOn(router, "push");
    await wrapper.find("button").trigger("click");
    expect(pushSpy).toHaveBeenCalledWith("/pokemon-list");
  });

  it("renders the welcome image", () => {
    const image = wrapper.find("img");
    expect(image.exists()).toBe(true);
    expect(image.attributes("src")).toBe("/src/assets/home.png");
    expect(image.attributes("alt")).toBe("");
  });

  it("displays the correct welcome text", () => {
    const welcomeText = wrapper.find("p.text-lg");
    expect(welcomeText.exists()).toBe(true);
    expect(welcomeText.text()).toContain("Welcome to Pokédex");
  });

  it("displays the correct description text", () => {
    const descriptionText = wrapper.find("p.text-muted");
    expect(descriptionText.exists()).toBe(true);
    expect(descriptionText.text()).toContain(
      "The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world."
    );
  });

});
