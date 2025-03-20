import { useJadwal } from "../context/JadwalContext";
import KomponenJadwal from "./KomponenJadwal";
import { useEffect } from "react";

const DaftarJadwal = () => {
    const { jadwal } = useJadwal();

    useEffect(() => {
        console.log("Daftar tugas diperbarui:", jadwal);
    }, [jadwal]);

    return (
        <ul>
            {jadwal.map((jdwl) => (
                <KomponenJadwal key={jdwl.id} jdwl={jdwl} />
            ))}
        </ul>
    );
};

export default DaftarJadwal;
