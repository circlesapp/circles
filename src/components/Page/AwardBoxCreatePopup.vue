<template>
	<div class="award__createpopup">
		<div class="award__createpopup__content">
			<button class="award__createpopup__content__clear" @click="$emit('isUpdated', false)">
				<i class="mdi mdi-close"></i>
			</button>
			<h3>수상 실적 등록</h3>
			<div class="award__createpopup__content__inputs">
				<div class="inputfield">
					<h4>대회명</h4>
					<input
						ref="startInput"
						v-model="title"
						class="inputfield__input"
						type="text"
						placeholder="대회명을 입력하세요"
					/>
				</div>
				<div class="inputfield">
					<h4>부문</h4>
					<input v-model="subtitle" class="inputfield__input" type="text" placeholder="부문을 입력하세요" />
				</div>
				<div class="inputfield">
					<h4>등급</h4>
					<input v-model="level" class="inputfield__input" type="text" placeholder="등급을 입력하세요" />
				</div>
				<div class="inputfield">
					<h4>참가자</h4>
					<div class="inputfield__input inputfield__inputuser" type="text">
						<span class="inputfield__input__member" v-for="(member,idx) in target" :key="member._id">
							<img :src="$store.state.mainPath+member.imgPath" alt />
							{{member.name}}
							<i class="mdi mdi-close" @click="removeTargetItem(idx)"></i>
						</span>
						<input
							v-model="searchTarget"
							:placeholder="target.length ? '' :'참가자를 입력하세요'"
							type="text"
							class="inputfield__input__userfield"
							@keydown="userInputKeyPress"
							@blur="hideTargets"
							@focus="showTargets = true"
						/>
						<div class="inputfield__input__userfield__autocomplete" v-if="showTargets">
							<div
								class="member"
								:class="{'member-active':targetCurrentIndex == idx}"
								v-for="(member,idx) in getNotJoinMembers"
								:key="member._id"
								@click="appendTargetItem(idx)"
							>
								<img :src="$store.state.mainPath+member.imgPath" alt />
								{{member.name}}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="award__createpopup__content__actions">
				<button class="create" @click="create">등록</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            members: [],
            title: "",
            subtitle: "",
            level: "",
            target: [] as any[],

            targetCurrentIndex: 0,
            searchTarget: "" as string,
            showTargets: false
        };
    },
    created() {
        this.$store
            .dispatch("GET_CLUB_MEMBERS")
            .then(members => {
                this.members = members;
            })
            .catch(err => {});
    },
    mounted() {
        (this.$refs.startInput as HTMLDivElement).focus();
        addEventListener("keydown", e => {
            if (e.keyCode == 27) this.$emit("isUpdated", false);
        });
    },
    methods: {
        userInputKeyPress(e: any) {
            if (this.targetCurrentIndex >= this.getNotJoinMembers.length)
                this.targetCurrentIndex = this.getNotJoinMembers.length;
            switch (e.keyCode) {
                case 13:
                    this.appendTargetItem(this.targetCurrentIndex);
                    this.targetCurrentIndex = 0;
                    break;
                case 8:
                    if (this.searchTarget == "") {
                        this.target.pop();
                    }
                    break;
                case 38:
                    if (this.targetCurrentIndex > 0) this.targetCurrentIndex--;
                    break;
                case 40:
                    if (
                        this.targetCurrentIndex <
                        this.getNotJoinMembers.length - 1
                    )
                        this.targetCurrentIndex++;
                    break;
            }
        },
        create() {
            this.$store.commit("pushLoading", {
                name: "AWARD",
                message: "동아리 수상 생성 중"
            });
            this.$store
                .dispatch("AWARD", {
                    title: this.title,
                    subtitle: this.subtitle,
                    level: this.level,
                    target: this.target.map(x => x._id)
                })
                .then(award => {
                    this.$store.commit("clearLoading", "AWARD");
                    this.$emit("isUpdated", false);
                })
                .catch(err => {});
        },
        appendTargetItem(idx: number) {
            let member = this.getNotJoinMembers[idx];
            if (member) {
                this.searchTarget = "";
                this.target.push(member);
            }
        },
        removeTargetItem(idx: number) {
            this.target.splice(idx, 1);
        },
        hideTargets() {
            setTimeout(() => {
                this.showTargets = false;
            }, 100);
        }
    },
    computed: {
        getNotJoinMembers(): any[] {
            return this.members.filter(
                (member: any) =>
                    this.target.findIndex(x => member._id == x._id) == -1 &&
                    member.name.indexOf(this.searchTarget) != -1
            );
        }
    }
});
</script>

<style>
.award__createpopup {
    position: fixed;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100vw;
    height: 100vh;

    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: rgba(0, 0, 0, 0.45);

    overflow: auto;

    z-index: 2000;
}
.award__createpopup__content__clear {
    position: absolute;
    top: 40px;
    right: 40px;
    width: 42px;
    height: 42px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 30px;

    border: none;
    border-radius: 50%;
    background-color: white;
    color: rgb(46, 46, 46);

    cursor: pointer;
    -webkit-transition: 0.2s;
    -moz-transition: 0.2s;
    -o-transition: 0.2s;
    transition: 0.2s;
}
.darkmode .award__createpopup__content__clear {
    background-color: #282828;
    color: white;
}
.award__createpopup__content__clear:hover {
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
    background-color: white;
}
.darkmode .award__createpopup__content__clear:hover {
    box-shadow: none;
    background-color: white;
    color: #282828;
}
.award__createpopup__content {
    background-color: white;
    border-radius: 39px;

    width: 100%;
    max-width: 800px;

    padding: 40px;
    margin: 10px;

    position: relative;
}
.darkmode .award__createpopup__content {
    color: white;
    background-color: #282828;
}
.award__createpopup__content h3 {
    font-family: NanumSquareB;
    font-size: 30px;
    color: #2e2e2e;
    margin-bottom: 20px;
}
.darkmode .award__createpopup__content h3 {
    color: white;
}
.award__createpopup__content__inputs {
    display: flex;
    flex-wrap: wrap;
}
.award__createpopup__content .inputfield {
    padding: 10px;
    width: 100%;
}
.award__createpopup__content .inputfield h4 {
    font-family: NanumSquareL;
    font-size: 24px;
    font-weight: none;
    margin-bottom: 10px;
}
.award__createpopup__content .inputfield .inputfield__input {
    border-radius: 8px;
    border: solid 1px #eeeeee;
    padding: 10px 20px;
    font-size: 24px;
    width: 100%;
    position: relative;
    background: none;
}
.darkmode .award__createpopup__content .inputfield .inputfield__input {
    border: solid 1px #3a3a3a;
}
.inputfield__inputuser {
    display: flex;
    flex-wrap: wrap;
    width: auto;
}
.inputfield__input__userfield {
    font-size: 24px;
    border: none;
    background: none;
    min-width: 100px;
}
.inputfield__input__userfield__autocomplete {
    position: absolute;
    left: 0;
    top: 100%;

    width: 100%;
    max-height: 200px;
    overflow-y: auto;

    background-color: white;
    box-shadow: 0 2px 6px 0 rgba(47, 83, 151, 0.1);
}
.inputfield__input__userfield__autocomplete .member {
    display: flex;
    align-items: center;

    padding: 10px 20px;
    cursor: pointer;
}
.inputfield__input__userfield__autocomplete .member-active,
.inputfield__input__userfield__autocomplete .member:hover {
    background-color: #eeeeee;
}
.inputfield__input__userfield__autocomplete img {
    height: 1.25em;
    width: 1.25em;
    margin-right: 10px;
    border-radius: 100%;
    box-shadow: 0 2px 39px 0 rgba(83, 143, 255, 0.22);
    border-radius: 100%;
    background-color: white;
}
.award__createpopup__content .inputfield input::placeholder,
.inputfield__input__userfield::placeholder {
    color: #999999;
}
.award__createpopup__content__actions {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: 20px;
}
.award__createpopup__content__actions button {
    border-radius: 31.5px;
    border: none;
    background: none;
    font-size: 24px;
    margin: 10px;

    cursor: pointer;
    transition: 0.2s;
}
.award__createpopup__content__actions .create {
    padding: 10px 40px;
    background-color: #538fff;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.22);
    color: #eeeeee;
}
.darkmode .award__createpopup__content__actions .create {
    background-color: #363636;
}
.award__createpopup__content__actions .create:hover {
    background-color: #538fffde;
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.27);
}

.inputfield__input__member {
    border-radius: 4px;
    background-color: #eeeeee;
    color: #2e2e2e;
    font-size: 18px;
    padding: 4px 10px;
    padding-right: 0;

    display: flex;
    align-items: center;
    margin-right: 10px;
}
.inputfield__input__member img {
    width: 1.25em;
    height: 1.25em;
    border-radius: 100%;
    background-color: white;
    margin-right: 10px;
}
.inputfield__input__member i {
    cursor: pointer;
    font-size: 0.7em;
    padding: 5px;
    padding-right: 10px;
}
</style>