import { render, fireEvent, screen } from "@testing-library/react";
import ProjectAdmin from "../components/Administration/ProjectAdmin";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom"; 

beforeEach(() => {
  fetchMock.resetMocks();
});


describe("ProjectAdmin Component", () => {

  test("allows the user to create a new project group", async () => {

    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));
    render(
      <MemoryRouter>
        <ProjectAdmin />
      </MemoryRouter>
    );

    
    const addButton = screen.getAllByAltText(/Add/i)[0]; // Assuming first Add button is for Project Group
    fireEvent.click(addButton);
    
    screen.logTestingPlaygroundURL();
    
    const semesterInput = screen.getByPlaceholderText(/Please follow this format/i);
    fireEvent.change(semesterInput, { target: { value: "SS24" } });
    
    const projectGroupInput = screen.getByPlaceholderText(/Please Enter Project Group Name/i);
    fireEvent.change(projectGroupInput, { target: { value: "Group A" } });
    
    const createButton = await screen.findByRole("button", { name: /Create/i });
    
    fireEvent.click(createButton);
    
    expect(await screen.findByText(/Success!/i)).toBeInTheDocument();
    
    screen.logTestingPlaygroundURL();
  });
  
  
  test("allows the user to select a semester and view the project groups", async () => {
    // Wrap the component with MemoryRouter
    render(
      <MemoryRouter>
        <ProjectAdmin />
      </MemoryRouter>
    );
    
    screen.debug();
    // Step 1: Open the Select Semester dropdown
    const selectTrigger = await screen.findByPlaceholderText("Select Semester");
    fireEvent.click(selectTrigger);

    // Log the current state to Testing Playground
    screen.logTestingPlaygroundURL();

    // Step 2: Select a specific semester (e.g., SS24)
    const semesterOption = await screen.findByText(/SS24/i);
    fireEvent.click(semesterOption);

    // Verify that the project groups are shown for that semester
    expect(await screen.findByText(/Group A/i)).toBeInTheDocument();

    // Log the current state to inspect project groups
    screen.logTestingPlaygroundURL();
  });

  
  test("allows the user to create a new project", async () => {
    // Wrap the component with MemoryRouter
    render(
      <MemoryRouter>
        <ProjectAdmin />
      </MemoryRouter>
    );

    // Step 1: Click the Add button for Project
    const addButton = screen.getAllByAltText(/Add/i)[1]; // Assuming second Add button is for Project
    fireEvent.click(addButton);

    // Log the current state to Testing Playground
    screen.logTestingPlaygroundURL();

    // Step 2: Fill out the form
    const projectGroupInput = screen.getByPlaceholderText(/Please Enter Project Group Name/i);
    fireEvent.change(projectGroupInput, { target: { value: "Group A" } });

    const projectNameInput = screen.getByPlaceholderText(/Please Enter Project Name/i);
    fireEvent.change(projectNameInput, { target: { value: "Project X" } });

    // Step 3: Click the Create button
    const createButton = await screen.findByText(/Create/i);
    fireEvent.click(createButton);

    // Verify that the project was created successfully
    expect(await screen.findByText(/Success!/i)).toBeInTheDocument();

    // Log the current state to inspect the created project
    screen.logTestingPlaygroundURL();
  });

  test("allows the user to select a project group and view the projects", async () => {
    // Wrap the component with MemoryRouter
    render(
      <MemoryRouter>
        <ProjectAdmin />
      </MemoryRouter>
    );

    // Step 1: Select a semester
    const selectSemester = await screen.findByPlaceholderText("Select Semester");
    fireEvent.click(selectSemester);
    const semesterOption = await screen.findByText(/SS24/i);
    fireEvent.click(semesterOption);

    // Log the current state to Testing Playground
    screen.logTestingPlaygroundURL();

    // Step 2: Select a project group
    const selectGroup = await screen.findByText(/Group A/i);
    fireEvent.click(selectGroup);

    // Verify that the projects are shown for the selected group
    expect(await screen.findByText(/Project X/i)).toBeInTheDocument();

    // Log the current state to inspect the projects
    screen.logTestingPlaygroundURL();
  });
  
  }); 
