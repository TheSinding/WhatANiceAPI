<template>
  <header class="masthead">
    <div class="container h-100">
      <div class="row h-100">
        <div class="col-lg-7 my-auto">
          <div class="header-content mx-auto">
            <h1 class="mb-5">It's as simple as doing</h1>
            <pre class="code-example shadow" v-highlightjs><code class="bash">curl --request GET http://whataniceapi.com/api/sentences?random=true&apikey={YOURKEY}</code></pre>
            <pre class="code-example shadow" v-highlightjs="sourcecode"><code class="json"></code></pre>
          </div>
        </div>
        <div class="col-lg-5 my-auto">
          <div class="device-container">
            <div class="device-mockup iphone6_plus portrait white">
              <div class="device">
                What a nice API, is a very simple REST API (streaming
                is coming), that speaks nicely to you.
                Use it to greet your customers, make
                a cute website saying nice things,
                have it greet you every time you open
                a new bash terminal. It's free
                <b-btn variant="primary">
                  Let's do it!
                  <!-- You can hook the "home button" to some JavaScript events or just remove it -->
                </b-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import client from '../vendors/feathers/'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      sourcecode: 'const str = "This sourcecode will update dynamically"'
    }
  },
  async  created () {
    const sentence = await client.service('sentences').find({ query: { random: true, apikey: '64da1f42-3a48-40e6-938e-eabf1e205037' } })
    const data = sentence[0]
    console.log(sentence[0])
    this.sourcecode =
`{
    \t"_id": "${data._id}",
    \t"sentence": "${data.sentence}",
    \t"sentiment": {
    \t\t"score": ${data.sentiment.score},
    \t\t"magnitude": ${data.sentiment.magnitude}
    \t},
    \t"language": "${data.language}",
    \t"createdAt": "${data.createdAt}",
    \t"updatedAt": "${data.updatedAt}"
}`
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.masthead {
  color: white;
  background: #957bbe;
  height: 100vh;
}
.code-example {
  border-radius: 8px;
}
</style>
