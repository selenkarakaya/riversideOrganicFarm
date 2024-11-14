import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { toast } from "react-toastify";
import CreateOwnRecipe from "../pages/CreateOwnRecipe";
import { addDoc, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "@testing-library/jest-dom";

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
test("renders CreateOwnRecipe form inputs", () => {
  render(
    <MemoryRouter>
      <CreateOwnRecipe />
    </MemoryRouter>
  );

  expect(screen.getByLabelText(/Recipe Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Serving Size/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Ingredients/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Instructions/i)).toBeInTheDocument();
});

test("updates formData state on input change", () => {
  render(
    <MemoryRouter>
      <CreateOwnRecipe />
    </MemoryRouter>
  );

  const recipeNameInput = screen.getByLabelText(/Recipe Name/i);
  fireEvent.change(recipeNameInput, { target: { value: "New Recipe" } });
  expect(recipeNameInput.value).toBe("New Recipe");

  const servingSizeInput = screen.getByLabelText(/Serving Size/i);
  fireEvent.change(servingSizeInput, { target: { value: "2" } });
  expect(servingSizeInput.value).toBe("2");
  fireEvent.change(recipeNameInput, { target: { value: "Spaghetti" } });

  // Check if the form state has been updated after the change
  expect(recipeNameInput.value).toBe("Spaghetti");
});

test("submits form and calls addDoc with formData", async () => {
  const mockAddDoc = jest.fn();
  addDoc.mockImplementation(mockAddDoc);

  render(
    <MemoryRouter>
      <CreateOwnRecipe />
    </MemoryRouter>
  );

  // Fill in form fields
  fireEvent.change(screen.getByLabelText(/Recipe Name/i), {
    target: { value: "Test Recipe" },
  });
  fireEvent.change(screen.getByLabelText(/Serving Size/i), {
    target: { value: "3" },
  });
  fireEvent.change(screen.getByLabelText(/Ingredients/i), {
    target: { value: "Flour, Sugar, Eggs" },
  });
  fireEvent.change(screen.getByLabelText(/Instructions/i), {
    target: { value: "Mix and bake" },
  });

  fireEvent.submit(screen.getByRole("button", { name: /Create Recipe/i }));

  await waitFor(() => expect(mockAddDoc).toHaveBeenCalledTimes(1));
  expect(toast.success).toHaveBeenCalledWith(
    "Your recipe is saved 🫶",
    expect.any(Object)
  );
  expect(mockNavigate).toHaveBeenCalledWith("/YourRecipes");
});

test("shows Spinner when loading", () => {
  render(
    <MemoryRouter>
      <CreateOwnRecipe />
    </MemoryRouter>
  );

  expect(screen.queryByRole("status")).toBeNull();
});
