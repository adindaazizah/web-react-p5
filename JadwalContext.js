import { createContext, useState, useEffect, useContext } from "react";

const JadwalContext = createContext();

export const JadwalGlobal = ({ children }) => {
    const [jadwal, setJadwal] = useState([]);

    // Load data dari localStorage saat aplikasi pertama kali dijalankan (Mounting)
    useEffect(() => {
        const simpanJadwal = JSON.parse(localStorage.getItem("jadwal"));
        if (simpanJadwal) {
            setJadwal(simpanJadwal);
        }
    }, []);

    // Simpan data ke localStorage setiap kali jadwal berubah (Updating)
    useEffect(() => {
        localStorage.setItem("jadwal", JSON.stringify(jadwal));
    }, [jadwal]);

    // Fungsi menambah jadwal baru
    const tambahJadwal = (tugas) => {
        if (!tugas || typeof tugas !== "string") return;
        console.log("Menambahkan tugas:", tugas);
        setJadwal([...jadwal, { id: Date.now(), tugas: tugas.trim() }]);
    };

    // Fungsi menghapus jadwal berdasarkan ID
    const hapusJadwal = (id) => {
        setJadwal(jadwal.filter((jdwl) => jdwl.id !== id));
    };

    // ✅ Fungsi edit jadwal berdasarkan ID
    const editJadwal = (id, tugasBaru) => {
        if (!tugasBaru || typeof tugasBaru !== "string") return;
        setJadwal(jadwal.map((jdwl) => 
            jdwl.id === id ? { ...jdwl, tugas: tugasBaru.trim() } : jdwl
        ));
    };

    return (
        <JadwalContext.Provider value={{ jadwal, tambahJadwal, hapusJadwal, editJadwal }}>
            {children}
        </JadwalContext.Provider>
    );
};

// Custom hook untuk menggunakan context
export const useJadwal = () => useContext(JadwalContext);
