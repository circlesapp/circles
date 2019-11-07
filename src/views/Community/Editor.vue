<template>
	<div class="editor">
		<div class="editor__menu">
			<h1>
				circles
				<span>editor.</span>
			</h1>
			<div class="inputfield">
				<h2>제목</h2>
				<input type="text" placeholder="제목을 입력하세요" />
			</div>
			<div class="inputfield">
				<h2>설명</h2>
				<input type="text" placeholder="설명을 입력하세요" />
			</div>
			<div class="editor__menu__components">
				<h2>컴포넌트 추가</h2>
				<div class="editor__menu__components__list">
					<div
						class="editor__menu__components__list__item"
						@dragstart="onStartDrag($event,'InformationLayout')"
						draggable
					>동아리 소개</div>
					<div
						class="editor__menu__components__list__item"
						@dragstart="onStartDrag($event,'MembersLayout')"
						draggable
					>멤버 소개</div>
					<div
						class="editor__menu__components__list__item"
						@dragstart="onStartDrag($event,'ApplyButtonLayout')"
						draggable
					>지원하기 버튼</div>
				</div>
			</div>
		</div>
		<div
			class="editor__content"
			@drop="onDrop"
			@dragover="onDragOver"
			@dragleave="onMouseOut"
			@dragstart="isInContentDrag = true"
			@mousedown="onClickIndex"
			ref="components"
		>
			<transition-group name="componentGrop" tag="div" class="editor__content__wrapper">
				<component
					draggable
					class="editor__content__component"
					:class="{'editor__content__component-gap':component.isDragGap}"
					v-for="(component) in getComponentList"
					:key="component.id"
					:is="component.component"
					ref="component"
				>{{component}}</component>
			</transition-group>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import InformationLayout from "../../components/Editor/Functional/InformationLayout.vue";
import MembersLayout from "../../components/Editor/Functional/MembersLayout.vue";
import ApplyButtonLayout from "../../components/Editor/Functional/ApplyButtonLayout.vue";

export default Vue.extend({
	components: {
		InformationLayout,
		MembersLayout,
		ApplyButtonLayout
	},
	data() {
		return {
			componentList: [] as any,
			currentComponent: "",
			currentSwapIndex: -1,
			currentPositionY: -1,
			isInContentDrag: false
		};
	},
	methods: {
		onClickIndex(e: MouseEvent) {
			let components = this.$refs.component as any[];
			if (components) {
				let heightSum = 0;
				let isBreak = false;
				for (let i = components.length - 1; i >= 0; i--) {
					let ele = components[i].$el;
					heightSum += ele.clientHeight;
					if (
						heightSum >
						e.clientY +
							(this.$refs.components as HTMLDivElement).scrollTop
					) {
						isBreak = true;
						this.currentSwapIndex = components.length - 1 - i;
						break;
					}
				}
				if (!isBreak) {
					this.currentSwapIndex = components.length;
				}
			} else {
				this.currentSwapIndex = 0;
			}
		},
		onDragOver(e: DragEvent) {
			let components = this.$refs.component as any[];
			if (components) {
				let heightSum = 0;
				let isBreak = false;
				for (let i = components.length - 1; i >= 0; i--) {
					let ele = components[i].$el;
					heightSum += ele.clientHeight;
					if (
						heightSum >
						e.clientY +
							(this.$refs.components as HTMLDivElement).scrollTop
					) {
						isBreak = true;
						this.currentPositionY = components.length - 1 - i;
						break;
					}
				}
				if (!isBreak) {
					this.currentPositionY = components.length;
				}
			} else {
				this.currentPositionY = 0;
			}
			e.preventDefault();
		},
		onStartDrag(e: DragEvent, component: string) {
			this.currentComponent = component;
		},
		onDrop(e: DragEvent) {
			e.preventDefault();
			if (!this.isInContentDrag) {
				this.componentList.splice(this.currentPositionY, 0, {
					component: this.currentComponent,
					data: {},
					isDragGap: false,
					id: new Date().getTime()
				});
				this.currentPositionY = -1;
			} else {
				let tmp = this.componentList[this.currentPositionY];
				this.componentList[this.currentPositionY] = this.componentList[
					this.currentSwapIndex
				];
				this.componentList[this.currentSwapIndex] = tmp;

				this.currentSwapIndex = -1;
				this.currentPositionY = -1;
				this.isInContentDrag = false;
			}
		},
		onMouseOut(e: DragEvent) {
			this.currentPositionY = -1;
		}
	},
	computed: {
		getComponentList(): any[] {
			return this.componentList.map((x: any, idx: number) => {
				x.isDragGap = idx == this.currentPositionY;
				return x;
			});
		}
	}
});
</script>

<style>
.componentGrop-move {
	transition: 0.5s;
}
.editor {
	display: flex;

	width: 100%;
	height: 100%;
}

.editor__menu {
	min-width: 300px;
	width: 100%;
	height: 100%;
	flex: 1;

	padding: 40px;

	background-color: white;
	box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.09);

	overflow-y: auto;

	z-index: 500;
}
.editor__menu h1 {
	font-size: 38px;
	font-weight: 300;
	margin-bottom: 40px;
}
.editor__menu h1 > span {
	font-family: AvenirBlack;
	font-weight: 800;
}
.editor__menu .inputfield {
	margin-top: 30px;
}
.editor__menu .inputfield:first-child {
	margin-top: 0;
}
.editor__menu .inputfield h2,
.editor__menu__components h2 {
	font-family: NanumSquareL;
	font-size: 24px;

	margin-bottom: 10px;
}
.editor__menu__components h2 {
	margin-bottom: 20px;
}
.editor__menu .inputfield input {
	padding: 10px 15px;
	border-radius: 8px;
	border: solid 1px #eeeeee;

	font-size: 24px;

	width: 100%;
}
.editor__menu .inputfield input::placeholder {
	color: #999999;
}
.editor__menu__components {
	margin-top: 30px;
}
.editor__menu__components__list__item {
	cursor: grab;

	border: solid 1px #ebebeb;

	display: flex;
	justify-content: center;
	align-items: center;

	height: 200px;
	margin-bottom: 40px;

	font-family: NanumSquareB;
	font-size: 28px;
}
.editor__menu__components__list__item:active {
	cursor: grabbing;
}

.editor__content {
	flex: 4;

	height: 100%;
	width: 100%;

	overflow-y: auto;
	margin-left: 10px;
}
.editor__content__component {
	transition: 0.5s;
	position: relative;
	margin-top: 10px;
}

.editor__content__component-gap {
	box-shadow: 0 2px 20px 0 rgba(99, 99, 99, 0.4);
	opacity: 0.5;
}
</style>