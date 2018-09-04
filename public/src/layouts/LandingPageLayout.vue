<template>
    <b-container fluid>
        <nav class="navbar  navbar-expand-lg navbar-light fixed-top"
            id="mainNav">
            <div class="container">
                <a class="navbar-brand js-scroll-trigger text-white font-logo"
                    href="#page-top">What a nice API!</a>
                <button class="navbar-toggler navbar-toggler-right"
                    type="button" data-toggle="collapse"
                    data-target="#navbarResponsive" aria-controls="navbarResponsive"
                    aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="fa fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <b-btn variant="none" class="text-white nav-link js-scroll-trigger"
                                href="/docs">
                                Documentation
                            </b-btn>
                        </li>
                        <li class="nav-item">
                            <b-btn class="text-white nav-link js-scroll-trigger"
                                href="/auth/github">
                                Sign in with Github
                                <i class="fab fa-github-square"></i>
                            </b-btn>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <router-view/>
    </b-container>
</template>
<script>
import client from '../vendors/feathers/'
export default {
  created () {
    console.log(client)
  }
}
</script>

<style scoped>
.container-fluid {
  padding: 0;
}
</style>
