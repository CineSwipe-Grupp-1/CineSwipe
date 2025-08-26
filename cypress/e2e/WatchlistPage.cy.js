// cypress/e2e/WatchlistPage.cy.js
describe("Watchlist – lägg till via UI och ta bort", () => {
  beforeEach(() => {
    // nollställ allt så inget gammalt påverkar
    cy.clearLocalStorage();
    cy.window().then((win) => win.sessionStorage.clear());

    // Stubba trending så HomePage alltid har data
    cy.intercept(
      { method: "GET", url: /\/3\/trending\/all\/week.*page=1.*/ },
      { fixture: "trending_page1.json" } // >=6 items och varje har poster_path
    ).as("tr1");
  });

  it("lägger till en film via Home och visar den i Watchlist, sen tar bort", () => {
    // 1) Gå till Home och vänta in filmerna
    cy.visit("/HomePage"); // eller "/" om din root visar Home
    cy.wait("@tr1");
    cy.get(".swipe-wrap", { timeout: 10000 }).should("exist");

    // 2) Klicka på hjärt-knappen (utan att kräva data-cy)
    //   Prova i ordning – den första som matchar i din app kommer funka:
    cy.contains("button", "❤️", { timeout: 8000 })
      .click({ force: true })
      .then({ timeout: 0 }, () => {}); // fortsätt även om första inte fanns
    cy.get("button.heart-button", { timeout: 2000 })
      .click({ force: true })
      .then({ timeout: 0 }, () => {});
    cy.get("button[aria-label*='watchlist'],button[aria-label*='Lägg till']", {
      timeout: 2000,
    }).click({ force: true });

    // 3) Öppna Watchlist via navbar-länk (stabil navigation genom din router)
    cy.get('a[href="/WatchlistPage"]', { timeout: 10000 }).click();
    cy.location("pathname").should("eq", "/WatchlistPage");
    cy.contains("My Watchlist", { timeout: 8000 }).should("exist");

    // 4) Verifiera att en av titlarna från din fixture syns.
    //    Byt "Mock Movie 1" till exakt titel i din cypress/fixtures/trending_page1.json
    cy.contains("Mock Movie 1", { timeout: 5000 }).should("exist");

    // 5) Ta bort filmen → tom-vy ska visas
    cy.get("button[aria-label*='Ta bort']").first().click();
    cy.contains("Din lista är tom 👀", { timeout: 5000 }).should("exist");
  });
});
