<template>
  <tr
    class="budgettableitem"
    @contextmenu="
      $emit('contextmenu', {
        e: $event,
        id: data._id,
      })
    "
  >
    <td>{{ data.item }}</td>
    <td>{{ data.size }}</td>
    <td>{{ data.price }}</td>
    <td>{{ data.quantity }}</td>
    <td>{{ data.shopping }}</td>
    <td>{{ data.total }}</td>
    <td class="budgettableitem__url">
      <a :href="data.url">{{ data.url }}</a>
    </td>
    <td>{{ getDate }}</td>
  </tr>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component';

class Props {
  data = prop<any>({});
}

@Options({})
export default class BudgetTableItem extends Vue.with(Props) {
  get getDate() {
    return new Date(this.data.date).toISOString().slice(0, 10);
  }
}
</script>

<style>
.budgettableitem td {
  padding: 20px;
  text-align: center;
}
.budgettableitem td {
  font-family: 'NanumSquareEB';
}
.budgettableitem__url {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.budgettableitem__url a {
  color: #9cb2cd;
  font-size: 20px;
  font-weight: 800;
  text-decoration: underline;
}
.budgettableitem__url a:visited {
  color: #538fff;
}
</style>
