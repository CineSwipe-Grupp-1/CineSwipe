describe("HomePage", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.window().then((win) => win.sessionStorage.clear());

    cy.intercept(
      { method: "GET", url: /\/3\/trending\/all\/week.*page=1.*/ },
      { fixture: "trending_page1.json" }
    ).as("getTrending1");

    cy.intercept(
      { method: "GET", url: /\/3\/trending\/all\/week.*page=2.*/ },
      { fixture: "trending_page2.json" }
    ).as("getTrending2");

    cy.visit("/HomePage");
  });

  it("laddar trending filmer och lägger till i watchlist", () => {
    cy.wait("@getTrending1");
    cy.get(".swipe-wrap", { timeout: 10000 }).should("exist");

    cy.get("button[aria-label='Lägg till i watchlist']").click();

    cy.visit("/WatchlistPage");
    cy.contains("Min Filmlista").should("exist");
    cy.contains("Mock Movie 1").should("exist");
  });
});
