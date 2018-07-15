
$('#formLogin #btnLogin').on('click', (e)=>{
    e.preventDefault();
    let nick=$('#formLogin #username').val().trim();
    let pass=$('#formLogin #password').val().trim();

    // TODO VALIDACIONES!
    $('#formLogin').submit();
    // fetch('/login', {
    //     headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json'
    //     },
    //     method: "POST",
    //     body: JSON.stringify({ username: nick, password: pass })
    // }).then((response)=>{ 
    //     return (response) ? response.json() : null;
    // }).then((data)=>{
    //     if (data===null) return null;
    //     console.log(data);
    // }).catch((res)=>{ 
    //     console.log(res) 
    // });
});