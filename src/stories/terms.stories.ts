import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import Terms from "@/components/Terms.vue";

export default {
	component: Terms,
	title: "Terms",
};

export const terms = () => ({
	components: { Terms },
	template: '<Terms @click="action"></Terms>',
	methods: { action: action("clicked") },
});
