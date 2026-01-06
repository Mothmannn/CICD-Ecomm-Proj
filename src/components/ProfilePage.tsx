import { useEffect, useState, type SetStateAction } from "react";
import { useAuth } from "../auth/useAuth";
import { getUserDoc, type AppUser } from "../firestore/userService"; // Firestore CRUD helpers
import { updateUserDoc } from "../firestore/userService";
import { deleteUserDoc } from "../firestore/userService";
import { deleteUser } from "firebase/auth";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<AppUser | null>(null);
  const [error, setError] = useState("");
  const [newName, setNewName] = useState<string>("");
  const navigate = useNavigate();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await updateUserDoc(user.uid, {
        displayName: newName,
      });
      alert("Profile updated!");
      // Clear only the input field, not the state
      const input = document.querySelector<HTMLInputElement>(
        'input[name="displayName"]'
      );
      if (input) input.value = "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    const confirm = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirm) return;

    try {
      await deleteUserDoc(user.uid); // remove Firestore doc
      await deleteUser(user); // remove Firebase Auth user
      alert("Account deleted.");
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (!loading && user) {
      getUserDoc(user.uid)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((data: any) => {
          if (data) {
            setProfile(data);
            console.log(data);
            setNewName(data.displayName || "");
          }
        })
        .catch((err: { message: SetStateAction<string> }) =>
          setError(err.message)
        );
    }
  }, [user, loading]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>You must be logged in to see this page.</p>;

  const handleOrderHistory = () => 
    navigate("/orders");

  return (
    <div>
      <NavBar />
      <h2>My Profile</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {profile ? (
        <div>
          <p>Email: {profile.email}</p>
          <p>Name: {profile.displayName}</p>

          <form>
            <input
              type="text"
              placeholder="Change Username"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />

            <button type="button" onClick={handleUpdate}>
              Update Username
            </button>
          </form>
          <button type="submit" onClick={handleDelete}>
            Delete Account
          </button>
          <button type="button" onClick={handleOrderHistory}>View Order History</button>
        </div>
      ) : (
        <p>No profile data found.</p>
      )}
    </div>
  );
};

export default ProfilePage;
