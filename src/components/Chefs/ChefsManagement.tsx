import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChef, addUser, editChef, deleteChef, fetchChefs } from "../../redux/thunks";
import { type AppDispatch, type RootState } from "../../redux/store";
import type { ChefType } from "../../types/chef.type";
import type { UserType } from "../../types/user.type";
import { Role } from "../../types/user.type";
import { type LoginType, login as loginService } from '../../services/auth.services';

const ChefManagement = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [chef, setChef] = useState<ChefType>({
        id: 0,
        userId: 0,
        user: { id: 0, name: '', email: '', role: Role.User } as UserType,
        recipes: [],
        image: '',
        averageRating: 0
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentChefId, setCurrentChefId] = useState<number | null>(null);
    const [image, setImage] = useState<File | null>(null); // State for image upload
    const chefs = useSelector((state: RootState) => state.chefs);
    useEffect(() => {
        dispatch(fetchChefs());
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setChef(prevChef => {
            const updatedUser = {
                ...prevChef.user,
                id: prevChef.user?prevChef.id:1, // שומר על ה-id הקיים
                name: name === 'name' ? (value || 'ברירת מחדל') : prevChef.user? prevChef.user.name:"", // אם השדה הוא name, מספק ערך ברירת מחדל
                email: name === 'email' ? value : prevChef.user? prevChef.user.email:"", // אם השדה הוא email, מעדכן את הערך
                role: name === 'role' ? (value as Role) : prevChef.user? prevChef.user.role:Role.User // אם השדה הוא role, מעדכן את הערך
            };

            return {
                ...prevChef,
                user: updatedUser
            };
        });
    };

    const handleAddChef = async () => {
        try {
            const actionResult = await dispatch(addUser({
                name: chef.user?.name || "",
                email: chef.user?.email || "",
                role: Role.User,
                password: "DefaultPassword123!" // סיסמה ברירת מחדל, ניתן לשנות לפי הצורך
            }));
            if (addUser.fulfilled.match(actionResult)) {
                console.log('User added successfully:', actionResult.payload);
                const userLogin: LoginType = { userName: chef.user?.name || "", email: chef.user?.email || "" };
                const user = await loginService(userLogin);
                const userId = user.user?.id || 0; // Ensure userId is always a number
                console.log('Logged in user:', user);

                // Update chef state with userId
                setChef(prevChef => ({ ...prevChef, userId,user }));

                // Dispatch the chef object and image to add the chef
                await dispatch(addChef({ chef: { ...chef, userId }, image }));
                resetForm();

                dispatch(fetchChefs());
            } else {
                console.error('Failed to add user:', actionResult.error);
            }
        } catch (error) {
            console.error('Failed to add user:', error);
        }
    };

    const handleEditChef = () => {
        if (currentChefId) {
            dispatch(editChef({ ...chef, id: currentChefId }));
            resetForm();
        }
    };

    const handleDeleteChef = (id: number) => {
        dispatch(deleteChef(id));
    };

    const resetForm = () => {
        setChef({
            id: 0,
            userId: 0,
            user: { id: 0, name: '', email: '', role: Role.User } as UserType, // Reset user state
            recipes: [],
            image: '',
            averageRating: 0
        });
        setIsEditing(false);
        setCurrentChefId(null);
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">{isEditing ? 'Edit Chef' : 'Add Chef'}</h2>
            <input
                type="text"
                name="name"
                value={chef.user?.name || ""}
                onChange={handleChange}
                placeholder="Chef Name"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
                type="email"
                name="email"
                value={chef.user?.email || ""}
                onChange={handleChange}
                placeholder="Chef Email"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
                type="number"
                name="averageRating"
                value={chef.averageRating}
                onChange={handleChange}
                placeholder="Average Rating"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button
                onClick={isEditing ? handleEditChef : handleAddChef}
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                {isEditing ? 'Update Chef' : 'Add Chef'}
            </button>
            {chefs && chefs.length > 0 && (
                <div className="mt-4">
                    {chefs.map(chef => (
                        <div key={chef.id} className="flex justify-between items-center p-2 border-b">
                            <span>{chef.user?.name || ""}</span>
                            <div>
                                <button
                                    onClick={() => {
                                        setIsEditing(true);
                                        setCurrentChefId(chef.id);
                                        setChef(chef);
                                    }}
                                    className="text-blue-500 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteChef(chef.id)}
                                    className="text-red-500 hover:underline ml-2"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChefManagement;
