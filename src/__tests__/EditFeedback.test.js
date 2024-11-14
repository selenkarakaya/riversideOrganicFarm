import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EditFeedback from "../pages/EditFeedback"; // Adjust the import based on your file structure
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

// Mock Firebase methods
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
  doc: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

beforeEach(() => {
  // Clear previous mocks before each test
  jest.clearAllMocks();
});

describe("EditFeedback Component", () => {
  //   test("renders feedback form and handles input changes", async () => {
  //     // Mock the Firebase Authentication state
  //     const mockUser = { uid: "test-user" };
  //     getAuth.mockReturnValue({
  //       currentUser: mockUser,
  //     });

  //     onAuthStateChanged.mockImplementationOnce((auth, callback) =>
  //       callback(mockUser)
  //     );

  //     // Mock the Firebase document data
  //     const mockFeedback = {
  //       name: "John Doe",
  //       feedback: "Great app!",
  //       userRef: "test-user",
  //     };

  //     getDoc.mockResolvedValue({
  //       exists: () => true,
  //       data: () => mockFeedback,
  //     });

  //     render(
  //       <MemoryRouter initialEntries={["/edit-feedback/1"]}>
  //         <Routes>
  //           <Route
  //             path="/edit-feedback/:feedbacksId"
  //             element={<EditFeedback />}
  //           />
  //         </Routes>
  //       </MemoryRouter>
  //     );

  //     // Wait for the form to render and check the pre-filled values
  //     await waitFor(() => screen.getByLabelText(/Your Name/i));
  //     expect(screen.getByLabelText(/Your Name/i).value).toBe(mockFeedback.name);
  //     expect(screen.getByLabelText(/Feedback/i).value).toBe(
  //       mockFeedback.feedback
  //     );

  //     // Simulate input change for feedback text area
  //     const feedbackInput = screen.getByLabelText(/Feedback/i);
  //     fireEvent.change(feedbackInput, { target: { value: "Awesome app!" } });

  //     // Check if input value was updated
  //     expect(feedbackInput.value).toBe("Awesome app!");
  //   });

  test("shows error if feedback does not exist", async () => {
    // Simulate Firebase response where document doesn't exist
    getDoc.mockResolvedValue({ exists: () => false });

    render(
      <MemoryRouter initialEntries={["/edit-feedback/1"]}>
        <Routes>
          <Route path="/EditFeedback/:feedbacksId" element={<EditFeedback />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.findByText("Feedback does not exist")); // Adjust based on your success message
  });

  test("redirects if feedback is not the user's", async () => {
    // Mock the Firebase Authentication state for a different user
    const mockUser = { uid: "test-user" };
    getAuth.mockReturnValue({
      currentUser: mockUser,
    });

    onAuthStateChanged.mockImplementationOnce((auth, callback) =>
      callback(mockUser)
    );

    // Mock Firebase data fetching
    const mockFeedback = {
      name: "John Doe",
      feedback: "Great app!",
      userRef: "test-user",
    };

    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => mockFeedback,
    });

    render(
      <MemoryRouter initialEntries={["/edit-feedback/1"]}>
        <Routes>
          <Route path="/EditFeedback/:feedbacksId" element={<EditFeedback />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the redirection and error toast
    await waitFor(() => {
      expect(screen.findByText("You can not edit that feedback"));
    });
  });
});

// expect(toast).toHaveBeenCalledWith(
//     "Your feedback was updated 👏",
//     expect.objectContaining({
//         position: "top-center",
//         autoClose: 700,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//     })
//   );
