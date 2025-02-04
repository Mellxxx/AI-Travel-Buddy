import { motion } from "framer-motion";
import "/node_modules/flag-icons/css/flag-icons.min.css";


const FlagMarquee = () => {
    const flags = [
        "sh", "ad", "br", "ca", "cn", "cu", "fj", "in", "jm", "mc",
        "gr", "it", "de", "us", "ar", "hr", "th", "tr", "ae", "ve",
        "za", "se", "si", "sa", "ru", "ph", "nz", "mx", "mt"
    ];

    return (
        <div className="relative w-full overflow-hidden bg-white dark:bg-[#020817] py-4">
            {/* 🔥 Links: Gradient-Fade von transparent nach weiß */}
            <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r dark:from-[#020817] from-white to-transparent z-10 pointer-events-none"></div>

            {/* 🔥 Rechts: Gradient-Fade von transparent nach weiß */}
            <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l dark:from-[#020817] from-white to-transparent z-10 pointer-events-none"></div>

            <motion.div
                className="flex gap-4 w-max"
                animate={{ x: ["0%", "-50%"] }} // Bewegt sich von 0% bis -50%
                transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
            >
                {[...flags, ...flags].map((flag, index) => (
                    <span key={index} className={`fi fi-${flag} text-[50px] h-[50px] w-[50px]`}></span>
                ))}
            </motion.div>
        </div>
    );
};

export default FlagMarquee;
