<template>
	<div class="editor">
		<div class="editor__menu">
			<button class="editor__back" @click="$router.back()">
				<i class="mdi mdi-arrow-left"></i>
			</button>
			<h1>
				circles
				<span>editor.</span>
				<sup>
					<i class="mdi mdi-beta"></i>
				</sup>
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
			<div class="editor__menu__action">
				<button class="exit" @click="$router.push({name:'home'})">나가기</button>
				<button class="save" @click="commit">저장</button>
			</div>
		</div>
		<div
			class="editor__content"
			@drop="onDrop"
			@dragover="onDragOver"
			@dragleave="onMouseOut"
			@dragstart="isInContentDrag = true"
			@mousedown="onClickIndex"
			@contextmenu="onContextMenu"
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
			currentSwapIndex: -1 as number,
			currentPositionY: -1 as number,
			isInContentDrag: false
		};
	},
	created() {
		this.componentList = this.getClub.page || [];
	},
	methods: {
		onClickIndex(e: MouseEvent) {
			let components = this.$refs.component as any[];
			let pointY =
				e.clientY + (this.$refs.components as HTMLDivElement).scrollTop;
			if (components) {
				let heightSum = 0;
				let isBreak = false;
				for (let i = 0; i < components.length; i++) {
					let ele = components[i].$el;
					let nextEle = components[i + 1]
						? components[i + 1].$el
						: null;
					heightSum += ele.clientHeight;
					if (
						heightSum > pointY &&
						(nextEle
							? pointY < heightSum + nextEle.clientHeight
							: true)
					) {
						isBreak = true;
						this.currentSwapIndex = i;
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
		onContextMenu(e: Event) {
			e.preventDefault();
			this.componentList.splice(this.currentSwapIndex, 1);
		},
		onDragOver(e: DragEvent) {
			let components = this.$refs.component as any[];
			let pointY =
				e.clientY + (this.$refs.components as HTMLDivElement).scrollTop;
			if (components) {
				let heightSum = 0;
				let isBreak = false;
				for (let i = 0; i < components.length; i++) {
					let ele = components[i].$el;
					let nextEle = components[i + 1]
						? components[i + 1].$el
						: null;
					heightSum += ele.clientHeight;
					if (
						heightSum > pointY &&
						(nextEle
							? pointY < heightSum + nextEle.clientHeight
							: true)
					) {
						isBreak = true;
						this.currentPositionY = i;
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
		},
		commit() {
			this.$store.commit("pushLoading", {
				name: "CLUB_MODIFICATION",
				message: "동아리 사이트 수정 중"
			});
			this.$store
				.dispatch("CLUB_MODIFICATION", {
					page: this.componentList
				})
				.then(club => {
					this.$store.commit("clearLoading", "CLUB_MODIFICATION");
				})
				.catch(err => console.log(err));
		}
	},
	computed: {
		getComponentList(): any[] {
			return this.componentList.map((x: any, idx: number) => {
				x.isDragGap = idx == this.currentPositionY;
				return x;
			});
		},
		getClub(): any {
			return this.$store.state.club;
		}
	}
});
</script>

<style>
.componentGrop-move {
	transition: 0.5s;
}
.componentGrop-enter-active,
.componentGrop-leave-active {
	transition: 0.5s;
}
.componentGrop-leave-active {
	position: absolute !important;
}
.componentGrop-enter,
.componentGrop-leave-to {
	transform: scale(0);
	opacity: 0;
}
.componentGrop-enter-to,
.componentGrop-leave {
	opacity: 1;
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
.editor__back {
	display: flex;
	justify-content: center;
	align-items: center;

	border: none;
	border-radius: 50%;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
	background-color: #999;
	color: white;
	width: 36px;
	height: 36px;

	cursor: pointer;
	transition: 0.2s;
}
.editor__back:hover {
	background-color: #538fffe1;
	box-shadow: 0 3px 5px rgba(0, 0, 0, 0.35);
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
.editor__menu i {
	font-size: 20px;
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
.editor__menu__action {
	display: flex;
}
.editor__menu__action button {
	flex: 1;

	border: none;

	background-color: #eeeeee;
	color: white;

	margin: 10px;
	padding: 10px;

	font-size: 20px;

	border-radius: 100px;

	cursor: pointer;
}
.editor__menu__action button.exit {
	background-color: #ff4475;
}
.editor__menu__action button.save {
	background-color: #538fff;
}
.editor__content {
	flex: 4;

	height: 100%;
	width: 100%;

	overflow-y: auto;
	margin-left: 10px;
}
.editor__content__wrapper {
	position: relative;
}
.editor__content__component {
	transition: 0.5s;
	position: relative;
	margin-top: 10px;

	width: 100%;
}

.editor__content__component-gap {
	box-shadow: 0 2px 20px 0 rgba(99, 99, 99, 0.4);
	opacity: 0.5;
}
</style>