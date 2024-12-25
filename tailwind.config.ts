import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import tailwindScrollbar from "tailwind-scrollbar"
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: "#084cac",
				secondary: "#fffffd",
				neutral: "#1f1f1f"
			},
			fontFamily: {
				'norwester': ['Norwester', 'arial']
			}
		}
	},

	plugins: [typography, forms, containerQueries, tailwindScrollbar]
} satisfies Config;
