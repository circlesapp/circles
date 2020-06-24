import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import CirclesCreatePopup from "@/components/CirclesCreatePopup.vue";
import AwardBoxCreatePopup from "@/components/Page/AwardBoxCreatePopup.vue";
import BudgetBoxCreatePopup from "@/components/Page/BudgetBoxCreatePopup.vue";

export default {
	component: [CirclesCreatePopup, AwardBoxCreatePopup, BudgetBoxCreatePopup],
	title: "Popup",
};

export const circlesCreatePopup = () => ({
	components: { CirclesCreatePopup },
	template: '<CirclesCreatePopup @click="action"></CirclesCreatePopup>',
	methods: { action: action("clicked") },
});

export const awardBoxCreatePopup = () => ({
	components: { AwardBoxCreatePopup },
	template: '<AwardBoxCreatePopup @click="action"></AwardBoxCreatePopup>',
	methods: { action: action("clicked") },
});

export const budgetBoxCreatePopup = () => ({
	components: { BudgetBoxCreatePopup },
	template: '<BudgetBoxCreatePopup @click="action"></BudgetBoxCreatePopup>',
	methods: { action: action("clicked") },
});
