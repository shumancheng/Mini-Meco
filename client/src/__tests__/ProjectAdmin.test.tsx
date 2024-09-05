import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProjectAdmin from "../components/Administration/ProjectAdmin";

describe("ProjectAdmin Component", () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => {
      if (url === "http://localhost:3000/semesters") {
        return Promise.resolve({
          json: () => Promise.resolve([{ semester: "SS24" }, { semester: "WS2425" }]),
        });
      }
      if (url === "http://localhost:3000/project-groups") {
        return Promise.resolve({
          json: () => Promise.resolve([{ projectGroupName: "Group A" }, { projectGroupName: "Group B" }]),
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve([]),
      });
    }) as jest.Mock;
  });

  it("fetches and displays semesters and project groups", async () => {
    render(<ProjectAdmin />, { wrapper: MemoryRouter });
    
    await waitFor(() => {
      expect(screen.getByText("SS24")).toBeInTheDocument();
      expect(screen.getByText("WS2425")).toBeInTheDocument();
      expect(screen.getByText("Group A")).toBeInTheDocument();
      expect(screen.getByText("Group B")).toBeInTheDocument();
    });
  });

  it("handles selecting a project group", async () => {
    render(<ProjectAdmin />, { wrapper: MemoryRouter });
    
    fireEvent.click(screen.getByText("Select Project Group"));
    
    await waitFor(() => {
      fireEvent.click(screen.getByText("Group A"));
      expect(screen.getByText("Group A")).toBeInTheDocument();
    });
  });
});
