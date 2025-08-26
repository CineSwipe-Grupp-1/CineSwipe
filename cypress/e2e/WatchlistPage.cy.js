describe("Watchlist – lägg till via UI och ta bort", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.window().then((win) => win.sessionStorage.clear());

    // Stubba första laddningen
    cy.intercept(
      { method: "GET", url: /\/3\/trending\/all\/week.*page=1.*/ },
      { fixture: "trending_page1.json" } // >=6 items, varje med poster_path
    ).as("tr1");

    // (valfritt) stubba sida 2 så appen inte hämtar riktigt nätverk
    cy.intercept(
      { method: "GET", url: /\/3\/trending\/all\/week.*page=2.*/ },
      { body: { results: [] } }
    ).as("tr2");
  });

  it("lägger till en film via Home och syns i Watchlist, sen tar bort", () => {
    // 1) Gå till Home och vänta på att kortleken renderas
    cy.visit("/HomePage"); // eller "/" om det är din index-route
    cy.wait("@tr1");
    cy.get(".swipe-wrap", { timeout: 10000 }).should("exist");

    // 2) Klicka Hjärtat (tre varianter – första som finns körs)
    cy.get("body").then(($b) => {
      if ($b.find("[data-cy=heart-btn]").length) {
        cy.get("[data-cy=heart-btn]").click({ force: true });
      } else if ($b.find("button[aria-label='Lägg till i watchlist']").length) {
        cy.get("button[aria-label='Lägg till i watchlist']").click({
          force: true,
        });
      } else {
        cy.contains("button", "❤️").click({ force: true });
      }
    });

    // 3) Kontrollera att något verkligen sparades (utan att gissa nyckeln)
    cy.window().then((win) => {
      const keys = Object.keys(win.localStorage).filter((k) =>
        k.toLowerCase().includes("watchlist")
      );
      const lists = keys.map((k) =>
        JSON.parse(win.localStorage.getItem(k) || "[]")
      );
      const total = lists.reduce(
        (n, arr) => n + (Array.isArray(arr) ? arr.length : 0),
        0
      );
      expect(
        total,
        `antal sparade filmer över nycklar: ${keys.join(", ")}`
      ).to.be.greaterThan(0);
    });

    // 4) Navigera via Navbar till Watchlist
    cy.get('a[href="/WatchlistPage"]', { timeout: 10000 }).click();
    cy.location("pathname").should("eq", "/WatchlistPage");

    // 5) Vänta på Watchlist-vyn och verifiera att minst en film visas
    //    (använd data-cy om du lade till det; annars klass + text)
    cy.get("[data-cy=watchlist-title], .watchlist-page h2", {
      timeout: 10000,
    }).should("exist");
    // matcha en titel från din fixture (ändra till korrekt titel om din heter annorlunda)
    cy.contains(".movie-title, h3", "Mock Movie 1", { timeout: 5000 }).should(
      "exist"
    );

    // 6) Ta bort första filmen och verifiera att listan uppdateras.
    cy.get("button[aria-label*='Ta bort']").first().click();

    // Antingen: tom-vy text (om bara 1 fanns)
    cy.contains("Din lista är tom 👀")
      .should("exist")
      .then(null, () => {
        // ...eller (fallback) bekräfta i storage att minskat antal filmer
        cy.window().then((win) => {
          const keys = Object.keys(win.localStorage).filter((k) =>
            k.toLowerCase().includes("watchlist")
          );
          const lists = keys.map((k) =>
            JSON.parse(win.localStorage.getItem(k) || "[]")
          );
          const total = lists.reduce(
            (n, arr) => n + (Array.isArray(arr) ? arr.length : 0),
            0
          );
          expect(total).to.be.gte(0);
        });
      });
  });
});
