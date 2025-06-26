<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import { turnstile } from '@svelte-put/cloudflare-turnstile';

    let login    = $state("");
    let password = $state("");

    $inspect(login, password)

    function authorization() {
        if (login.length > 8) {
            alert("login не должен быть длинее 8 символов");
            return;
        }
        if (password.length > 8) {
            alert("password не должен быть длинее 8 символов");
            return;
        }
        if (login.length == 0) {
            alert("login не указан");
            return;
        }
        if (password.length == 0) {
            alert("password не указан")
            return;
        }
        getServer();
    };
    function getServer() {
        alert("Отправлен запрос на сервеа")
    }

</script>

<!-- <Tag color="#ffffff" />  Что такое JSX? -->

<div class="w-[30vw] m-auto flex flex-col gap-4"
    use:turnstile
    turnstile-sitekey="1x00000000000000000000AA"
    turnstile-theme="light"
    turnstile-retry-interval={5010}
>
    <div class="flex items-center gap-2">
        <label for="login">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tag-icon lucide-tag"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>
        </label>
        <input 
            bind:value={login}
            placeholder="login" 
            type="text"
            id="login" 
            class="bg-white/15 p-1 w-full border-1 rounded-[12px] border-white/40 backdrop-blur-md text-white"
        >
    </div>
    <div class="flex items-center gap-2">
        <label for="password">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-icon lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </label>
        <input 
            bind:value={password} 
            id="password"
            placeholder="password"
            type="password" 
            class="bg-white/15 p-1 w-full border-1 rounded-[12px] border-white/40 backdrop-blur-md text-white"
        >
    </div>
    <Button onclick={authorization} varibal="glass" flex={true} >Авторизоваться</Button>
</div>