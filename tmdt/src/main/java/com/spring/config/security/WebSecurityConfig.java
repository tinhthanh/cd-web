package com.spring.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private JwtAuthenticationEntryPoint unauthorizedHandler;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private LogoutSuccess logoutSuccess;

	@Value("${jwt.cookie}")
	public String AUTH_COOKIE;

	@Autowired
	public void configureAuthentication(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder.userDetailsService(this.userDetailsService).passwordEncoder(passwordEncoder());
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public JwtAuthenticationTokenFilter authenticationTokenFilterBean() throws Exception {
		return new JwtAuthenticationTokenFilter();
	}
	
	@Bean
	public CSRFHeaderFilter CSRFHeaderFilterBean() throws Exception {
		return new CSRFHeaderFilter();
	}
	
	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity
				// we don't need CSRF because our token is invulnerable
				.csrf().disable()

				.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()

				// don't create session
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()

				.authorizeRequests()
				// allow anonymous resource requests
				.antMatchers(HttpMethod.GET, "/", "/*.html", "/favicon.ico", "/**/*.html", "/**/*.css", "/**/*.js")
				.permitAll().antMatchers("/auth/**").permitAll().antMatchers(HttpMethod.POST, "/user").permitAll()
				.antMatchers(HttpMethod.PATCH, "/user/register_status/*").permitAll()
				.antMatchers(HttpMethod.GET, "/user/token_reset_password").permitAll()
				.antMatchers(HttpMethod.GET, "/users/**").permitAll()
				.antMatchers(HttpMethod.GET, "/user/info/**").permitAll()
//				.antMatchers(HttpMethod.GET, "/pay/success").permitAll()
				.antMatchers(HttpMethod.PATCH, "/user/password_reset").permitAll().anyRequest().authenticated().and()
				.logout().logoutRequestMatcher(new AntPathRequestMatcher("/auth/logout"))
				.logoutSuccessHandler(logoutSuccess).deleteCookies(AUTH_COOKIE);

				// disable csrf for the login request
				httpSecurity.csrf()
				.ignoringAntMatchers("/auth/login")
				.ignoringAntMatchers("/user/password_reset")
				.ignoringAntMatchers("/user/register_status/*")
				.ignoringAntMatchers("/user/token_reset_password")
				.ignoringAntMatchers("/auth/logout")
				.ignoringAntMatchers("/user/info/**")
				.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
				
		httpSecurity.addFilterAfter(CSRFHeaderFilterBean(), CsrfFilter.class);
		// Custom JWT based security filter
		httpSecurity.addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);
	
		httpSecurity.csrf().disable();
		// disable page caching
		httpSecurity.headers().cacheControl();
	}
	
	

	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.addAllowedOrigin("*");
		config.addAllowedHeader("*");
		config.addAllowedMethod("OPTIONS");
		config.addAllowedMethod("GET");
		config.addAllowedMethod("POST");
		config.addAllowedMethod("PUT");
		config.addAllowedMethod("DELETE");
		source.registerCorsConfiguration("/**", config);
		return new CorsFilter(source);
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers(HttpMethod.POST, "/auth");
		web.ignoring().antMatchers(HttpMethod.GET, "/", "/jsondoc", //
				"/webjars/**", "/*.html", "/favicon.ico", "/**/*.html", "/**/*.css", "/**/*.js");

		web.ignoring().antMatchers(HttpMethod.POST, "/user");
		web.ignoring().antMatchers(HttpMethod.PATCH, "/user/register_status/**");
		web.ignoring().antMatchers(HttpMethod.OPTIONS, "/**");
	}
}
