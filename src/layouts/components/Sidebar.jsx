import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Sidebar = ({ navItems }) => {
    return (
        <aside className="w-68 bg-white border-r border-gray-200 flex flex-col shrink-0 h-full">
            <div className="mt-6 flex justify-center items-center h-24 shrink-0">
                <img src={logo} alt="Logo" className="h-24" />
            </div>

            <nav className="mt-2 flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-5">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center space-x-3 px-5 py-3 rounded-[0.7rem] font-medium transition-colors ${isActive
                                        ? 'bg-[#c62828] text-white shadow-sm'
                                        : 'text-gray-800 hover:bg-gray-100 hover:text-primary'
                                    }`
                                }
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

        </aside>
    );
};

export default memo(Sidebar);
