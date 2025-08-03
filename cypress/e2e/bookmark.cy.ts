describe("Bookmark Functionality E2E Test", () => {
  beforeEach(() => {
    // Custom Cypress login command (assumed to restore session)
    cy.login();
  });

  it("allows a user to bookmark, view, and unbookmark a job", () => {
    // Visit homepage
    cy.visit("/");

    // ✅ Wait until the loading message disappears
    cy.contains("Loading...").should("not.exist");

    // ✅ Check that job list is rendered
    cy.get("[data-testid=job-list]", { timeout: 10000 }).should("exist");

    // ✅ Ensure at least one job card exists
    cy.get('[data-testid^="job-card-"]', { timeout: 10000 }).should("exist");

    // 🧪 Proceed with bookmark flow
    cy.get('[data-testid^="job-card-"]')
      .first()
      .then(($jobCard) => {
        const jobId = $jobCard.data("testid").split("-").pop();
        const bookmarkButtonSelector = `[data-testid=bookmark-btn-${jobId}]`;

        // Bookmark the job
        cy.wrap($jobCard).find(bookmarkButtonSelector).click();
        cy.contains("Job bookmarked!").should("be.visible");

        // Verify icon is filled (bookmarked)
        cy.get(bookmarkButtonSelector)
          .find("svg")
          .should("have.attr", "fill", "currentColor");

        // Navigate to bookmarks
        cy.get("[data-testid=bookmarks-nav-link]").click();
        cy.url().should("include", "/bookmarks");

        // Check that bookmarked job appears
        cy.get(`[data-testid=job-card-${jobId}]`).should("exist");

        // Unbookmark it
        cy.get(bookmarkButtonSelector).click();
        cy.contains("Bookmark removed!").should("be.visible");

        // Verify icon is unfilled (not bookmarked)
        cy.get(bookmarkButtonSelector)
          .find("svg")
          .should("have.attr", "fill", "none");

        // Recheck bookmarks page
        cy.get("[data-testid=bookmarks-nav-link]").click();
        cy.url().should("include", "/bookmarks");

        // Job should no longer be in bookmarks
        cy.get(`[data-testid=job-card-${jobId}]`).should("not.exist");

        // Empty state message should appear
        cy.get("[data-testid=no-bookmarks-message]").should("be.visible");
      });
  });
});
