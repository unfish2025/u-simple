<script lang="ts">
import * as utils from '@/utils'
// @ts-ignore
globalThis.utils = utils
import Vue from 'vue'
export default Vue.extend({
	mpType: 'app'
})
</script>

<style>
/*每个页面公共css */
@import url('./styles/index.css');
</style>
