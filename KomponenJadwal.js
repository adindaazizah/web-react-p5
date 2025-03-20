import { useState } from "react";
import { useJadwal } from "../context/JadwalContext";

const KomponenJadwal = ({ jdwl }) => {
    const { editJadwal, hapusJadwal } = useJadwal();
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(jdwl.tugas);

    // Fungsi mulai edit
    const handleEdit = () => setIsEditing(true);

    // Fungsi simpan perubahan
    const handleSave = () => {
        editJadwal(jdwl.id, newText);
        setIsEditing(false);
    };

    return (
        <li>
            {isEditing ? (
                <>
                    <input 
                        type="text" 
                        value={newText} 
                        onChange={(e) => setNewText(e.target.value)} 
                    />
                    <button onClick={handleSave}>Save</button>
                </>
            ) : (
                <>
                    {jdwl.tugas}
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={() => hapusJadwal(jdwl.id)}>Hapus</button>
                </>
            )}
        </li>
    );
};

export default KomponenJadwal;
