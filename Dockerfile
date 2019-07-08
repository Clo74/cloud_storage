FROM airhacks/glassfish
COPY ./target/cloud_st.war ${DEPLOYMENT_DIR}
